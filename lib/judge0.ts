interface Judge0Submission {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
}

interface Judge0Result {
  token: string;
  status: {
    id: number;
    description: string;
  };
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  time?: string;
  memory?: number;
}

// Language IDs for Judge0
export const LANGUAGE_IDS = {
  javascript: 63, // Node.js
  python: 71, // Python 3
  java: 62, // Java
  cpp: 54, // C++
  c: 50, // C
  csharp: 51, // C#
  go: 60, // Go
  rust: 73, // Rust
  typescript: 74, // TypeScript
} as const;

export type SupportedLanguage = keyof typeof LANGUAGE_IDS;

const JUDGE0_API_URL =
  process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

export class Judge0Service {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (JUDGE0_API_KEY) {
      headers["X-RapidAPI-Key"] = JUDGE0_API_KEY;
      headers["X-RapidAPI-Host"] = "judge0-ce.p.rapidapi.com";
    }

    const response = await fetch(`${JUDGE0_API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Judge0 API error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  async submitCode(submission: Judge0Submission): Promise<string> {
    const result = await this.makeRequest("/submissions", {
      method: "POST",
      body: JSON.stringify(submission),
    });

    return result.token;
  }

  async getSubmission(token: string): Promise<Judge0Result> {
    return this.makeRequest(`/submissions/${token}`);
  }

  async executeCode(
    code: string,
    language: SupportedLanguage,
    input?: string
  ): Promise<Judge0Result> {
    const submission: Judge0Submission = {
      source_code: code,
      language_id: LANGUAGE_IDS[language],
      stdin: input,
    };

    const token = await this.submitCode(submission);

    // Poll for result
    let result: Judge0Result;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
      result = await this.getSubmission(token);
      attempts++;
    } while (result.status.id <= 2 && attempts < maxAttempts); // Status 1-2 are "In Queue" and "Processing"

    return result;
  }

  async runTestCases(
    code: string,
    language: SupportedLanguage,
    testCases: Array<{ input: string; expectedOutput: string }>
  ): Promise<
    Array<{
      passed: boolean;
      output?: string;
      error?: string;
      expected: string;
    }>
  > {
    const results = await Promise.all(
      testCases.map(async (testCase) => {
        try {
          const result = await this.executeCode(code, language, testCase.input);

          if (result.status.id === 3) {
            // Accepted
            const output = result.stdout?.trim() || "";
            const expected = testCase.expectedOutput.trim();
            return {
              passed: output === expected,
              output,
              expected,
            };
          } else {
            return {
              passed: false,
              error:
                result.stderr ||
                result.compile_output ||
                result.status.description,
              expected: testCase.expectedOutput,
            };
          }
        } catch (error) {
          return {
            passed: false,
            error: error instanceof Error ? error.message : "Unknown error",
            expected: testCase.expectedOutput,
          };
        }
      })
    );

    return results;
  }
}

export const judge0 = new Judge0Service();
