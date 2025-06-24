import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  Code, 
  Brain, 
  Zap, 
  Target,
  Clock,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Article data
const articles = [
  {
    number: 1,
    id: "intro-to-programming",
    title: "Introduction to Programming",
    description: "Learn what programming is, why it's valuable, and how to get started on your coding journey.",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    duration: "15 minutes",
    difficulty: "Beginner",
    content: `
      <h2>What is Programming?</h2>
      <p>Programming is the art of giving instructions to a computer to perform specific tasks. Think of it as writing a recipe that a computer can follow step by step.</p>
      
      <h3>Why Learn Programming?</h3>
      <p>Programming skills are valuable because they:</p>
      <ul>
        <li>Enhance problem-solving abilities</li>
        <li>Open up career opportunities</li>
        <li>Enable you to build useful tools</li>
        <li>Improve logical thinking</li>
        <li>Help you understand how technology works</li>
      </ul>
      
      <h3>What Can You Build?</h3>
      <p>With programming, you can create:</p>
      <ul>
        <li>Websites and web applications</li>
        <li>Mobile apps</li>
        <li>Games</li>
        <li>Data analysis tools</li>
        <li>Automation scripts</li>
        <li>And much more!</li>
      </ul>
      
      <h3>Getting Started</h3>
      <p>The best way to learn programming is to start with a beginner-friendly language like Python. Python is known for its simple syntax and readability, making it perfect for newcomers.</p>
      
      <div class="bg-blue-50 p-4 rounded-lg my-4">
        <h4>💡 Pro Tip</h4>
        <p>Don't worry if you don't understand everything at first. Programming is learned through practice and experimentation!</p>
      </div>
      
      <h3>Next Steps</h3>
      <p>In the next article, we'll learn about variables and data types - the building blocks of any program.</p>
    `
  },
  {
    number: 2,
    id: "variables-and-data-types",
    title: "Variables and Data Types",
    description: "Understand how to store and work with different types of data in your programs.",
    icon: Code,
    color: "text-green-600",
    bgColor: "bg-green-50",
    duration: "20 minutes",
    difficulty: "Beginner",
    content: `
      <h2>What are Variables?</h2>
      <p>Variables are like containers that store information in your program. They have names and can hold different types of data.</p>
      
      <h3>Creating Variables</h3>
      <p>In Python, you create a variable by giving it a name and assigning a value:</p>
      <pre><code>name = "Alice"
age = 25
is_student = True</code></pre>
      
      <h3>Basic Data Types</h3>
      <p>Python has several basic data types:</p>
      
      <h4>Numbers</h4>
      <p>Integers (whole numbers) and decimals:</p>
      <pre><code>age = 25          # integer
height = 5.8       # decimal (float)
temperature = -5   # negative number</code></pre>
      
      <h4>Strings</h4>
      <p>Text enclosed in quotes:</p>
      <pre><code>name = "Alice"
message = 'Hello, World!'
favorite_color = "blue"</code></pre>
      
      <h4>Booleans</h4>
      <p>True or false values:</p>
      <pre><code>is_student = True
is_working = False
has_car = True</code></pre>
      
      <h3>Working with Variables</h3>
      <p>You can use variables in calculations and combine them:</p>
      <pre><code># Math with numbers
x = 10
y = 5
sum = x + y        # 15
product = x * y    # 50

# Combining strings
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name  # "John Doe"</code></pre>
      
      <div class="bg-green-50 p-4 rounded-lg my-4">
        <h4>🎯 Practice Exercise</h4>
        <p>Try creating variables for your name, age, and favorite programming language. Then print them out!</p>
      </div>
      
      <h3>Variable Naming Rules</h3>
      <ul>
        <li>Use descriptive names (e.g., <code>user_age</code> instead of <code>a</code>)</li>
        <li>Use lowercase letters and underscores</li>
        <li>Don't start with numbers</li>
        <li>Avoid Python keywords (like <code>if</code>, <code>for</code>, <code>while</code>)</li>
      </ul>
    `
  },
  {
    number: 3,
    id: "control-flow",
    title: "Control Flow: Making Decisions",
    description: "Learn how to make your programs respond to different conditions using if statements and loops.",
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    duration: "25 minutes",
    difficulty: "Beginner",
    content: `
      <h2>Making Decisions with If Statements</h2>
      <p>Control flow allows your program to make decisions and execute different code based on conditions.</p>
      
      <h3>Basic If Statement</h3>
      <p>An if statement checks if a condition is true and executes code accordingly:</p>
      <pre><code>age = 18

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")</code></pre>
      
      <h3>Comparison Operators</h3>
      <p>You can compare values using these operators:</p>
      <ul>
        <li><code>==</code> Equal to</li>
        <li><code>!=</code> Not equal to</li>
        <li><code>&gt;</code> Greater than</li>
        <li><code>&lt;</code> Less than</li>
        <li><code>&gt;=</code> Greater than or equal to</li>
        <li><code>&lt;=</code> Less than or equal to</li>
      </ul>
      
      <h3>Multiple Conditions</h3>
      <p>You can combine conditions using <code>and</code> and <code>or</code>:</p>
      <pre><code>age = 20
has_license = True

if age >= 18 and has_license:
    print("You can drive!")
else:
    print("You cannot drive.")</code></pre>
      
      <h3>Loops: Repeating Actions</h3>
      <p>Loops allow you to repeat code multiple times:</p>
      
      <h4>For Loops</h4>
      <p>Use for loops when you know how many times to repeat:</p>
      <pre><code># Count from 1 to 5
for i in range(1, 6):
    print(i)

# Loop through a list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)</code></pre>
      
      <h4>While Loops</h4>
      <p>Use while loops when you want to repeat until a condition is met:</p>
      <pre><code>count = 0
while count < 5:
    print(count)
    count += 1</code></pre>
      
      <div class="bg-purple-50 p-4 rounded-lg my-4">
        <h4>🔍 Key Concept</h4>
        <p>Control flow is fundamental to programming - it's how we make programs that can respond to different situations!</p>
      </div>
      
      <h3>Common Patterns</h3>
      <p>Here are some common patterns you'll use:</p>
      <pre><code># Check if a number is even or odd
number = 7
if number % 2 == 0:
    print("Even")
else:
    print("Odd")

# Loop until user enters 'quit'
while True:
    user_input = input("Enter 'quit' to exit: ")
    if user_input == 'quit':
        break
    print("You entered:", user_input)</code></pre>
    `
  },
  {
    number: 4,
    id: "functions",
    title: "Functions: Reusable Code",
    description: "Create reusable blocks of code with functions to make your programs more organized and efficient.",
    icon: Brain,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    duration: "30 minutes",
    difficulty: "Beginner",
    content: `
      <h2>What are Functions?</h2>
      <p>Functions are reusable blocks of code that perform a specific task. They help you organize your code and avoid repetition.</p>
      
      <h3>Creating a Function</h3>
      <p>Here's how to create a simple function:</p>
      <pre><code>def greet():
    print("Hello, World!")

# Call the function
greet()</code></pre>
      
      <h3>Functions with Parameters</h3>
      <p>Functions can accept input values called parameters:</p>
      <pre><code>def greet(name):
    print(f"Hello, {name}!")

# Call with different names
greet("Alice")
greet("Bob")</code></pre>
      
      <h3>Functions with Return Values</h3>
      <p>Functions can return values back to the caller:</p>
      <pre><code>def add_numbers(a, b):
    return a + b

result = add_numbers(5, 3)
print(result)  # 8</code></pre>
      
      <h3>Multiple Parameters</h3>
      <p>Functions can have multiple parameters:</p>
      <pre><code>def calculate_area(length, width):
    area = length * width
    return area

rectangle_area = calculate_area(10, 5)
print(f"The area is {rectangle_area} square units")</code></pre>
      
      <h3>Default Parameters</h3>
      <p>You can provide default values for parameters:</p>
      <pre><code>def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")           # Hello, Alice!
greet("Bob", "Hi")       # Hi, Bob!</code></pre>
      
      <h3>Built-in Functions</h3>
      <p>Python comes with many useful built-in functions:</p>
      <pre><code># len() - get length of a string or list
name = "Python"
print(len(name))  # 6

# type() - get the type of a value
print(type(42))   # &lt;class 'int'&gt;
print(type("hello"))  # &lt;class 'str'&gt;

# input() - get user input
user_name = input("What's your name? ")
print(f"Hello, {user_name}!")</code></pre>
      
      <div class="bg-orange-50 p-4 rounded-lg my-4">
        <h4>💡 Pro Tip</h4>
        <p>Functions should do one thing well. If a function is doing too many things, consider breaking it into smaller functions.</p>
      </div>
      
      <h3>Practice Example</h3>
      <p>Here's a complete example combining what we've learned:</p>
      <pre><code>def calculate_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

def display_grade(name, score):
    grade = calculate_grade(score)
    print(f"{name} got a {grade} with a score of {score}")

# Test the functions
display_grade("Alice", 95)
display_grade("Bob", 75)
display_grade("Charlie", 55)</code></pre>
    `
  },
  {
    number: 5,
    id: "arrays-and-lists",
    title: "Arrays and Lists",
    description: "Work with collections of data efficiently using arrays and lists.",
    icon: Zap,
    color: "text-red-600",
    bgColor: "bg-red-50",
    duration: "25 minutes",
    difficulty: "Beginner",
    content: `
      <h2>What are Lists?</h2>
      <p>Lists are collections of items stored in a single variable. They allow you to work with multiple pieces of data at once.</p>
      
      <h3>Creating Lists</h3>
      <p>Lists are created using square brackets:</p>
      <pre><code># List of numbers
numbers = [1, 2, 3, 4, 5]

# List of strings
fruits = ["apple", "banana", "orange"]

# Mixed types
mixed = [1, "hello", True, 3.14]</code></pre>
      
      <h3>Accessing List Items</h3>
      <p>You can access items by their position (index) in the list:</p>
      <pre><code>fruits = ["apple", "banana", "orange"]

print(fruits[0])  # apple (first item)
print(fruits[1])  # banana (second item)
print(fruits[2])  # orange (third item)</code></pre>
      
      <p><strong>Important:</strong> List indices start at 0, not 1!</p>
      
      <h3>Modifying Lists</h3>
      <p>Lists are mutable, meaning you can change them:</p>
      <pre><code>fruits = ["apple", "banana", "orange"]

# Change an item
fruits[1] = "grape"

# Add an item
fruits.append("mango")

# Remove an item
fruits.remove("apple")

print(fruits)  # ['grape', 'orange', 'mango']</code></pre>
      
      <h3>Common List Operations</h3>
      <p>Here are some useful things you can do with lists:</p>
      
      <h4>Finding the Length</h4>
      <pre><code>numbers = [1, 2, 3, 4, 5]
print(len(numbers))  # 5</code></pre>
      
      <h4>Checking if an Item Exists</h4>
      <pre><code>fruits = ["apple", "banana", "orange"]
print("apple" in fruits)  # True
print("grape" in fruits)  # False</code></pre>
      
      <h4>Sorting Lists</h4>
      <pre><code>numbers = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 6, 9]</code></pre>
      
      <h3>Looping Through Lists</h3>
      <p>You can use loops to process all items in a list:</p>
      <pre><code>fruits = ["apple", "banana", "orange"]

# Using a for loop
for fruit in fruits:
    print(fruit)

# Using indices
for i in range(len(fruits)):
    print(f"Item {i}: {fruits[i]}")</code></pre>
      
      <h3>List Comprehensions</h3>
      <p>List comprehensions are a concise way to create lists:</p>
      <pre><code># Create a list of squares
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(squares)  # [1, 4, 9, 16, 25]

# Create a list of even numbers
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]</code></pre>
      
      <div class="bg-red-50 p-4 rounded-lg my-4">
        <h4>🎯 Practice Exercise</h4>
        <p>Create a list of your favorite movies, then write a loop to print each movie with a number (1, 2, 3, etc.).</p>
      </div>
      
      <h3>Nested Lists</h3>
      <p>Lists can contain other lists:</p>
      <pre><code># A list of lists (2D list)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access elements
print(matrix[0][1])  # 2 (first row, second column)</code></pre>
    `
  },
  {
    number: 6,
    id: "problem-solving-basics",
    title: "Problem Solving Basics",
    description: "Learn a systematic approach to solving programming problems step by step.",
    icon: CheckCircle,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    duration: "35 minutes",
    difficulty: "Intermediate",
    content: `
      <h2>The Problem Solving Framework</h2>
      <p>Effective problem solving follows a structured approach. Here's a framework that works for most programming problems.</p>
      
      <h3>The 5-Step Process</h3>
      <ol>
        <li><strong>Understand the Problem:</strong> Read carefully, identify inputs/outputs, clarify requirements</li>
        <li><strong>Plan Your Approach:</strong> Break down the problem, choose algorithms/data structures</li>
        <li><strong>Write the Code:</strong> Implement your solution step by step</li>
        <li><strong>Test Your Solution:</strong> Check with examples, edge cases, and different inputs</li>
        <li><strong>Optimize:</strong> Look for ways to improve efficiency or readability</li>
      </ol>
      
      <h3>Example: Reverse a String</h3>
      <p>Let's apply this framework to reverse a string:</p>
      
      <h4>1. Understand</h4>
      <p>Input: "hello" → Output: "olleh"</p>
      <p>We need to take a string and return it backwards.</p>
      
      <h4>2. Plan</h4>
      <ul>
        <li>Start from the end of the string</li>
        <li>Build a new string character by character</li>
        <li>Or use built-in reverse methods</li>
      </ul>
      
      <h4>3. Implement</h4>
      <pre><code>def reverse_string(s):
    return s[::-1]  # Python slice notation

# Alternative approach
def reverse_string_manual(s):
    result = ""
    for i in range(len(s) - 1, -1, -1):
        result += s[i]
    return result</code></pre>
      
      <h4>4. Test</h4>
      <pre><code>print(reverse_string("hello"))  # "olleh"
print(reverse_string(""))       # ""
print(reverse_string("a"))      # "a"
print(reverse_string("123"))    # "321"</code></pre>
      
      <h4>5. Optimize</h4>
      <p>The slice approach is already optimal for Python. The manual approach could be improved using a list and join.</p>
      
      <h3>Common Problem Types</h3>
      <p>Here are some common types of programming problems:</p>
      
      <h4>Array/String Problems</h4>
      <ul>
        <li>Finding elements (search, filter)</li>
        <li>Modifying elements (sort, reverse, transform)</li>
        <li>Counting elements</li>
        <li>Finding patterns</li>
      </ul>
      
      <h4>Mathematical Problems</h4>
      <ul>
        <li>Number operations</li>
        <li>Prime numbers</li>
        <li>Factorials</li>
        <li>Fibonacci sequence</li>
      </ul>
      
      <h4>Logic Problems</h4>
      <ul>
        <li>Conditional statements</li>
        <li>Boolean logic</li>
        <li>Decision trees</li>
      </ul>
      
      <h3>Practice Problem</h3>
      <p>Try solving this problem using the 5-step framework:</p>
      <div class="bg-indigo-50 p-4 rounded-lg my-4">
        <h4>🎯 Challenge</h4>
        <p>Write a function that counts the number of vowels in a string. Vowels are a, e, i, o, u (both uppercase and lowercase).</p>
        <p>Example: count_vowels("Hello World") should return 3.</p>
      </div>
      
      <h3>Solution</h3>
      <pre><code>def count_vowels(s):
    vowels = "aeiouAEIOU"
    count = 0
    for char in s:
        if char in vowels:
            count += 1
    return count

# Test
print(count_vowels("Hello World"))  # 3
print(count_vowels("Python"))       # 1
print(count_vowels("AEIOU"))        # 5</code></pre>
      
      <h3>Tips for Success</h3>
      <ul>
        <li>Start with simple examples</li>
        <li>Draw diagrams or write pseudocode</li>
        <li>Test with edge cases (empty input, single element, etc.)</li>
        <li>Don't be afraid to start with a simple solution and improve it</li>
        <li>Practice regularly with different types of problems</li>
      </ul>
    `
  }
];

export default function ArticlePage({ 
  params 
}: { 
  params: { article: string } 
}) {
  const { article } = params;
  
  // Sort articles by number just in case
  const sortedArticles = articles.slice().sort((a, b) => a.number - b.number);
  const articleData = sortedArticles.find(a => a.id === article);
  if (!articleData) {
    notFound();
  }

  // Find next article
  const nextArticle = sortedArticles.find(a => a.number === articleData.number + 1);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/learn">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Learn
            </Link>
          </Button>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4 rounded-lg ${articleData.bgColor}`}>
            <articleData.icon className={`h-12 w-12 ${articleData.color}`} />
          </div>
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-2">
              <span className="text-muted-foreground font-mono text-2xl">{articleData.number}.</span>
              {articleData.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {articleData.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{articleData.duration}</span>
          </div>
          <Badge variant="secondary">{articleData.difficulty}</Badge>
        </div>
      </div>

      {/* Article Content */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Article Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: articleData.content }}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href="/learn">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learn
          </Link>
        </Button>
        {nextArticle ? (
          <Button asChild>
            <Link href={`/learn/${nextArticle.id}`}>
              Next Topic
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            End of Topics
          </Button>
        )}
      </div>
    </div>
  );
} 