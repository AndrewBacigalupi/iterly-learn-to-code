import "dotenv/config";
import { db } from "./index";
import { problems, puzzles } from "./schema";

const problemsData = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters.",
    difficulty: "easy",
    tags: ["strings", "two-pointers"],
    functionName: "reverseString",
    testCases: [
      {
        input: '["h","e","l","l","o"]',
        expectedOutput: '["o","l","l","e","h"]',
      },
      {
        input: '["H","a","n","n","a","h"]',
        expectedOutput: '["h","a","n","n","a","H"]',
      },
    ],
    starterCode: {
      javascript: `function reverseString(s) {
    // Write your solution here
    
}`,
      python: `def reverseString(s):
    # Write your solution here
    pass`,
      java: `public class Solution {
    public void reverseString(char[] s) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    void reverseString(vector<char>& s) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    title: "Valid Parentheses",
    description:
      "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "easy",
    tags: ["stack", "strings"],
    functionName: "isValid",
    testCases: [
      { input: '"()"', expectedOutput: "true" },
      { input: '"()[]{}"', expectedOutput: "true" },
      { input: '"(]"', expectedOutput: "false" },
    ],
    starterCode: {
      javascript: `function isValid(s) {
    // Write your solution here
    
}`,
      python: `def isValid(s):
    # Write your solution here
    pass`,
      java: `public class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    title: "Merge Two Sorted Lists",
    description:
      "You are given the heads of two sorted linked lists. Merge the two lists into one sorted list.",
    difficulty: "easy",
    tags: ["linked-list", "recursion"],
    functionName: "mergeTwoLists",
    testCases: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        expectedOutput: "[1,1,2,3,4,4]",
      },
      { input: "list1 = [], list2 = []", expectedOutput: "[]" },
    ],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {
    // Write your solution here
    
}`,
      python: `def mergeTwoLists(list1, list2):
    # Write your solution here
    pass`,
      java: `public class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    title: "Binary Tree Inorder Traversal",
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: "medium",
    tags: ["tree", "depth-first-search", "stack"],
    functionName: "inorderTraversal",
    testCases: [
      { input: "root = [1,null,2,3]", expectedOutput: "[1,3,2]" },
      { input: "root = []", expectedOutput: "[]" },
    ],
    starterCode: {
      javascript: `function inorderTraversal(root) {
    // Write your solution here
    
}`,
      python: `def inorderTraversal(root):
    # Write your solution here
    pass`,
      java: `public class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    title: "Longest Palindromic Substring",
    description:
      "Given a string s, return the longest palindromic substring in s.",
    difficulty: "medium",
    tags: ["string", "dynamic-programming"],
    functionName: "longestPalindrome",
    testCases: [
      { input: '"babad"', expectedOutput: '"bab" or "aba"' },
      { input: '"cbbd"', expectedOutput: '"bb"' },
    ],
    starterCode: {
      javascript: `function longestPalindrome(s) {
    // Write your solution here
    
}`,
      python: `def longestPalindrome(s):
    # Write your solution here
    pass`,
      java: `public class Solution {
    public String longestPalindrome(String s) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        // Write your solution here
        
    }
};`,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    title: "Median of Two Sorted Arrays",
    description:
      "Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.",
    difficulty: "hard",
    tags: ["array", "binary-search", "divide-and-conquer"],
    functionName: "findMedianSortedArrays",
    testCases: [
      { input: "nums1 = [1,3], nums2 = [2]", expectedOutput: "2.0" },
      { input: "nums1 = [1,2], nums2 = [3,4]", expectedOutput: "2.5" },
    ],
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
    // Write your solution here
    
}`,
      python: `def findMedianSortedArrays(nums1, nums2):
    # Write your solution here
    pass`,
      java: `public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Write your solution here
        
    }
};`,
    },
  },
];

const puzzlesData = [
  {
    id: "550e8400-e29b-41d4-a716-446655441001",
    title: "Sum of Numbers",
    description: "Calculate the sum of the given numbers.",
    difficulty: "easy",
    tags: ["math", "basic"],
    input: "1, 2, 3, 4, 5",
    expectedOutput: "15",
    hint: "Add all the numbers together.",
    explanation: "1 + 2 + 3 + 4 + 5 = 15",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441002",
    title: "Count Vowels",
    description:
      "Count the number of vowels (a, e, i, o, u) in the given text.",
    difficulty: "easy",
    tags: ["strings", "counting"],
    input: "Hello World Programming",
    expectedOutput: "6",
    hint: "Count each occurrence of a, e, i, o, u (case insensitive).",
    explanation: "e, o, o, o, a, i = 6 vowels total",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441003",
    title: "Find Maximum",
    description: "Find the maximum number in the given list.",
    difficulty: "easy",
    tags: ["math", "arrays"],
    input: "12, 45, 7, 23, 56, 89, 34",
    expectedOutput: "89",
    hint: "Look for the largest number in the list.",
    explanation: "89 is the largest number in the given list.",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441004",
    title: "Count Words",
    description: "Count the number of words in the given sentence.",
    difficulty: "easy",
    tags: ["strings", "counting"],
    input: "The quick brown fox jumps over the lazy dog",
    expectedOutput: "9",
    hint: "Count spaces and add 1, or split by spaces and count.",
    explanation: "There are 9 words separated by spaces.",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441005",
    title: "Fibonacci Sequence",
    description:
      "Find the 10th number in the Fibonacci sequence (starting with 0, 1).",
    difficulty: "medium",
    tags: ["math", "sequences"],
    input: "10",
    expectedOutput: "55",
    hint: "Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...",
    explanation: "The 10th Fibonacci number (0-indexed) is 55.",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441006",
    title: "Prime Factorization",
    description: "Find all prime factors of the given number.",
    difficulty: "medium",
    tags: ["math", "prime-numbers"],
    input: "60",
    expectedOutput: "2, 2, 3, 5",
    hint: "Divide by smallest primes repeatedly: 2, 3, 5, 7, 11...",
    explanation: "60 = 2 × 2 × 3 × 5, so the prime factors are 2, 2, 3, 5.",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441007",
    title: "Binary to Decimal",
    description: "Convert the binary number to decimal.",
    difficulty: "medium",
    tags: ["math", "conversion"],
    input: "1101",
    expectedOutput: "13",
    hint: "1×8 + 1×4 + 0×2 + 1×1 = 8 + 4 + 0 + 1 = 13",
    explanation: "1101₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441008",
    title: "Matrix Sum",
    description: "Calculate the sum of all elements in the 3x3 matrix.",
    difficulty: "hard",
    tags: ["math", "matrix"],
    input: "1 2 3\n4 5 6\n7 8 9",
    expectedOutput: "45",
    hint: "Add all 9 numbers together.",
    explanation: "1+2+3+4+5+6+7+8+9 = 45",
  },
];

export async function seedProblems() {
  console.log("Seeding problems...");

  try {
    for (const problem of problemsData) {
      await db
        .insert(problems)
        .values({
          id: problem.id,
          title: problem.title,
          description: problem.description,
          difficulty: problem.difficulty,
          tags: problem.tags,
          functionName: problem.functionName,
          testCases: problem.testCases,
          starterCode: problem.starterCode,
        })
        .onConflictDoUpdate({
          target: problems.id,
          set: {
            title: problem.title,
            description: problem.description,
            difficulty: problem.difficulty,
            tags: problem.tags,
            functionName: problem.functionName,
            testCases: problem.testCases,
            starterCode: problem.starterCode,
            updatedAt: new Date(),
          },
        });
    }

    console.log("Problems seeded successfully!");
  } catch (error) {
    console.error("Error seeding problems:", error);
    throw error;
  }
}

export async function seedPuzzles() {
  console.log("Seeding puzzles...");

  try {
    for (const puzzle of puzzlesData) {
      await db
        .insert(puzzles)
        .values({
          id: puzzle.id,
          title: puzzle.title,
          description: puzzle.description,
          difficulty: puzzle.difficulty,
          tags: puzzle.tags,
          input: puzzle.input,
          expectedOutput: puzzle.expectedOutput,
          hint: puzzle.hint,
          explanation: puzzle.explanation,
        })
        .onConflictDoUpdate({
          target: puzzles.id,
          set: {
            title: puzzle.title,
            description: puzzle.description,
            difficulty: puzzle.difficulty,
            tags: puzzle.tags,
            input: puzzle.input,
            expectedOutput: puzzle.expectedOutput,
            hint: puzzle.hint,
            explanation: puzzle.explanation,
            updatedAt: new Date(),
          },
        });
    }

    console.log("Puzzles seeded successfully!");
  } catch (error) {
    console.error("Error seeding puzzles:", error);
    throw error;
  }
}

export async function seedAll() {
  await seedProblems();
  await seedPuzzles();
}

if (require.main === module) {
  seedAll()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
