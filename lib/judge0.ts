interface Judge0Submission {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
  cpu_time_limit?: number;
  memory_limit?: number;
  wall_time_limit?: number;
  redirect_stderr_to_stdout?: boolean;
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

// Updated Language IDs for Judge0 based on actual API response
export const LANGUAGE_IDS = {
  javascript: 102, // JavaScript (Node.js 22.08.0) - latest
  python: 100, // Python (3.12.5) - latest
  java: 91, // Java (JDK 17.0.6) - latest
  cpp: 105, // C++ (GCC 14.1.0) - latest
  c: 103, // C (GCC 14.1.0) - latest
  typescript: 101, // TypeScript (5.6.2) - latest
  go: 107, // Go (1.23.5) - latest
  rust: 108, // Rust (1.85.0) - latest
} as const;

export type SupportedLanguage = keyof typeof LANGUAGE_IDS;

const JUDGE0_API_URL =
  process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

// Code wrapper service to add I/O handling to user code
class CodeWrapperService {
  wrapCode(
    userCode: string,
    language: SupportedLanguage,
    functionName?: string
  ): string {
    switch (language) {
      case "javascript":
        return this.wrapJavaScript(userCode, functionName);
      case "python":
        return this.wrapPython(userCode, functionName);
      case "java":
        return this.wrapJava(userCode);
      case "cpp":
        return this.wrapCpp(userCode);
      default:
        return userCode;
    }
  }

  private wrapJavaScript(userCode: string, functionName?: string): string {
    // Extract function name if not provided
    if (!functionName) {
      const match = userCode.match(/function\s+(\w+)\s*\(/);
      functionName = match ? match[1] : "solution";
    }

    return `
${userCode}

// Read from stdin and call the function
const input = require('fs').readFileSync(0, 'utf8').trim();
try {
  const parsedInput = JSON.parse(input);
  let result;
  
  if (Array.isArray(parsedInput)) {
    // For functions that take an array as input
    result = ${functionName}(parsedInput);
  } else if (typeof parsedInput === 'string') {
    // For functions that take a string as input
    result = ${functionName}(parsedInput);
  } else {
    // Try to call with the parsed input directly
    result = ${functionName}(parsedInput);
  }
  
  console.log(JSON.stringify(result));
} catch (error) {
  console.error('Error:', error.message);
}
`;
  }

  private wrapPython(userCode: string, functionName?: string): string {
    // Extract function name if not provided
    if (!functionName) {
      const match = userCode.match(/def\s+(\w+)\s*\(/);
      functionName = match ? match[1] : "solution";
    }

    return `
import sys
import json

${userCode}

# Read from stdin and call the function
try:
    input_data = sys.stdin.read().strip()
    parsed_input = json.loads(input_data)
    
    if isinstance(parsed_input, list):
        # For functions that take a list as input
        result = ${functionName}(parsed_input)
    elif isinstance(parsed_input, str):
        # For functions that take a string as input
        result = ${functionName}(parsed_input)
    else:
        # Try to call with the parsed input directly
        result = ${functionName}(parsed_input)
    
    print(json.dumps(result))
except Exception as error:
    print(f"Error: {error}", file=sys.stderr)
`;
  }

  private wrapJava(userCode: string): string {
    return `
import java.util.*;
import java.io.*;
import com.google.gson.*;

${userCode}

public class Main {
    public static void main(String[] args) {
        try {
            Scanner scanner = new Scanner(System.in);
            StringBuilder inputBuilder = new StringBuilder();
            while (scanner.hasNextLine()) {
                inputBuilder.append(scanner.nextLine());
            }
            
            Gson gson = new Gson();
            String input = inputBuilder.toString().trim();
            
            // This is a simplified wrapper - would need specific implementation per problem
            System.out.println("Java execution not fully implemented");
            
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}
`;
  }

  private wrapCpp(userCode: string): string {
    return `
#include <iostream>
#include <string>
#include <vector>
#include <sstream>

${userCode}

int main() {
    try {
        std::string input;
        std::getline(std::cin, input);
        
        // This is a simplified wrapper - would need specific implementation per problem
        std::cout << "C++ execution not fully implemented" << std::endl;
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }
    
    return 0;
}
`;
  }
}

export class Judge0Service {
  private codeWrapper = new CodeWrapperService();

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
      const errorText = await response.text();
      throw new Error(
        `Judge0 API error: ${response.status} ${response.statusText} - ${errorText}`
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
    input?: string,
    functionName?: string
  ): Promise<Judge0Result> {
    // Wrap the user code with I/O handling
    const wrappedCode = this.codeWrapper.wrapCode(code, language, functionName);

    const submission: Judge0Submission = {
      source_code: wrappedCode,
      language_id: LANGUAGE_IDS[language],
      stdin: input || "",
      cpu_time_limit: 2, // 2 seconds
      memory_limit: 128000, // 128 MB in KB
      wall_time_limit: 5, // 5 seconds
      redirect_stderr_to_stdout: false,
    };

    const token = await this.submitCode(submission);

    // Poll for result
    let result: Judge0Result;
    let attempts = 0;
    const maxAttempts = 15;

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
    testCases: Array<{ input: string; expectedOutput: string }>,
    functionName?: string
  ): Promise<
    Array<{
      passed: boolean;
      output?: string;
      error?: string;
      expected: string;
      status?: string;
      time?: string;
      memory?: number;
    }>
  > {
    const results = await Promise.all(
      testCases.map(async (testCase) => {
        try {
          const result = await this.executeCode(
            code,
            language,
            testCase.input,
            functionName
          );

          if (result.status.id === 3) {
            // Accepted
            const output = result.stdout?.trim() || "";
            const expected = testCase.expectedOutput.trim();
            return {
              passed: output === expected,
              output,
              expected,
              status: result.status.description,
              time: result.time,
              memory: result.memory,
            };
          } else {
            return {
              passed: false,
              error:
                result.stderr ||
                result.compile_output ||
                result.status.description,
              expected: testCase.expectedOutput,
              status: result.status.description,
              time: result.time,
              memory: result.memory,
            };
          }
        } catch (error) {
          return {
            passed: false,
            error: error instanceof Error ? error.message : "Unknown error",
            expected: testCase.expectedOutput,
            status: "Error",
          };
        }
      })
    );

    return results;
  }
}

export const judge0 = new Judge0Service();
