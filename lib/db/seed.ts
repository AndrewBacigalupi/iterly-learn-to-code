import "dotenv/config";
import { db } from "./index";
import { problems } from "./schema";

const problemsData = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters.",
    difficulty: "easy",
    tags: ["strings", "two-pointers"],
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

if (require.main === module) {
  seedProblems()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
