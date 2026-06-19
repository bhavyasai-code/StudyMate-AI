/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  institution: string;
  review: string;
  avatar: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Flashcard {
  id: string;
  subject: string;
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation: string;
}

export interface BotResponse {
  keywords: string[];
  response: string;
}

// Mock Testimonials
export const TestimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    role: "Computer Science Sophomore",
    institution: "IIT Bombay",
    review: "The Quiz Generator and Doubt Assistant are exceptional. I cleared my DBMS normalization concepts in under ten minutes. A stellar revision tool!",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5
  },
  {
    id: "2",
    name: "Emily Watson",
    role: "Data Engineering Master's Student",
    institution: "Stanford University",
    review: "StudyMate AI helped me compile and wrap up complex system architecture summaries for my end-term exam. Visual feedback is extremely clean and intuitive.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5
  },
  {
    id: "3",
    name: "Rohan Das",
    role: "Electronics Third Year",
    institution: "BITS Pilani",
    review: "I love the 3D flipping flashcards with clean tactile transitions. Perfect for learning key definitions on mobile devices while traveling.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5
  }
];

// Mock FAQs
export const FAQsData: FAQItem[] = [
  {
    id: "faq-1",
    question: "How does StudyMate AI work?",
    answer: "StudyMate AI leverages local processing mechanics and intelligent text extraction to analyze inputs on-the-fly. It converts complex paragraphs into core concept bulletins, generates target timelines, supports quick queries in the chatbot, and presents optimized revision elements."
  },
  {
    id: "faq-2",
    question: "Is StudyMate AI free?",
    answer: "Absolutely! StudyMate AI is fully free to use for students, educators, and software builders looking to streamline academic productivity and review complex engineering concepts."
  },
  {
    id: "faq-3",
    question: "Can it generate custom flashcards and quizzes?",
    answer: "Yes. StudyMate AI houses a premium interactive Quiz Generator loaded with deep conceptual questions across CS domains and specialized Flashcards displaying high-yield definition answers instantly with 3D animation loops."
  },
  {
    id: "faq-4",
    question: "Can it help me with urgent exam preparation?",
    answer: "Our Study Planner uses active-recall models to generate step-by-step revision calendars tailored to your specific subject and remaining prep hours, ensuring you cover high-yield domains efficiently before your test."
  }
];

// Flashcards Dataset
export const FlashcardsData: Flashcard[] = [
  // AI & ML
  {
    id: "fc-1",
    subject: "AI & ML",
    question: "What is Machine Learning?",
    answer: "Machine Learning (ML) is a branch of computer science and AI focusing on the use of data and algorithms to enable systems to learn and improve performance incrementally, without being explicitly programmed."
  },
  {
    id: "fc-2",
    subject: "AI & ML",
    question: "What is Deep Learning?",
    answer: "Deep Learning is a specialized subfield of ML based on multi-layered artificial neural networks. It mimics the human brain structure to extract complex hierarchy patterns from unstructured data."
  },
  // Python
  {
    id: "fc-3",
    subject: "Python",
    question: "What is a List in Python?",
    answer: "A List is a mutable, ordered collection of arbitrary data elements. Lists are written with square brackets (e.g. [1, 'text', True]) and support indexing, slicing, appending, and nested variables."
  },
  {
    id: "fc-4",
    subject: "Python",
    question: "What is a Dictionary?",
    answer: "A Dictionary is a collection of key-value pairs that is mutable but unordered. Keys must be unique, immutable types (like strings, numbers, or tuples) and allow lightning-fast O(1) average lookups."
  },
  // DBMS
  {
    id: "fc-5",
    subject: "DBMS",
    question: "What is a Primary Key?",
    answer: "A Primary Key is a minimal super key selected to uniquely identify each record in a database table. It must contain unique non-null values, enforcing entity integrity constraints."
  },
  {
    id: "fc-6",
    subject: "DBMS",
    question: "What is Database Normalization?",
    answer: "Normalization is the systematic process of organizing relation schemas to reduce redundancy and eliminate update, insertion, and deletion anomalies by splitting large tables and utilizing foreign keys."
  }
];

// Computer Science Quiz Bank (5 High-Quality Questions per Subject)
export const QuizBank: QuizQuestion[] = [
  // AI & ML
  {
    id: "q-aiml-1",
    subject: "AI & ML",
    question: "Which of the following is an example of supervised machine learning?",
    options: [
      "Clustering customer segments via K-Means",
      "Predicting housing rates using Linear Regression",
      "Finding frequent itemsets with the Apriori algorithm",
      "Dimensionality reduction using Principal Component Analysis"
    ],
    correctAnswer: 1,
    explanation: "Supervised learning involves learning on labeled training data with explicit inputs and known outputs. Linear regression fits this description."
  },
  {
    id: "q-aiml-2",
    subject: "AI & ML",
    question: "What architectural component in Deep Learning mimics biological synaptic connections?",
    options: [
      "B+ tree index nodes",
      "Weighted edges in artificial neural networks",
      "Convolutional max-pooling filters",
      "Backpropagation optimization queues"
    ],
    correctAnswer: 1,
    explanation: "Weighted connections between neurons scale values similarly to chemical strength alterations in physical organic synapses."
  },
  {
    id: "q-aiml-3",
    subject: "AI & ML",
    question: "Which evaluation metric represents the harmonic mean of precision and recall?",
    options: [
      "Mean Squared Error (MSE)",
      "Receiver Operating Characteristic (ROC)",
      "F1-Score",
      "Coefficient of Determination (R²)"
    ],
    correctAnswer: 2,
    explanation: "F1-score is defined as 2 * (Precision * Recall) / (Precision + Recall), giving a balanced measure for class-imbalanced datasets."
  },
  {
    id: "q-aiml-4",
    subject: "AI & ML",
    question: "In Machine Learning, what is overfitting?",
    options: [
      "When the model performs exceptionally on both training and test data",
      "When the model performs terribly on training but well on test data",
      "When the model learns noise and details of the training set to the point it ruins test generalizability",
      "When neural networks have too few nodes to approximate mathematical models"
    ],
    correctAnswer: 2,
    explanation: "Overfitting occurs when a high-capacity model captures random variances or noise present only inside training samples."
  },
  {
    id: "q-aiml-5",
    subject: "AI & ML",
    question: "Who is widely credited with proposing the term 'Artificial Intelligence' at the Dartmouth Workshop in 1956?",
    options: [
      "Alan Turing",
      "John McCarthy",
      "Yann LeCun",
      "Geoffrey Hinton"
    ],
    correctAnswer: 1,
    explanation: "John McCarthy organized the historic 1956 Dartmouth Summer Research Project on Artificial Intelligence, formally establishing the field."
  },

  // Python
  {
    id: "q-py-1",
    subject: "Python",
    question: "Which built-in collection data structure in Python is ordered and immutable?",
    options: [
      "List",
      "Dictionary",
      "Set",
      "Tuple"
    ],
    correctAnswer: 3,
    explanation: "Tuples are immutable sequence collections, representing unalterable groupings of related values widely used for record coordinates."
  },
  {
    id: "q-py-2",
    subject: "Python",
    question: "What does the '__init__' method represent in custom Python classes?",
    options: [
      "An internal initializer that compiles system variables",
      "The constructor method invoked automatically when a new class instance is instantiated",
      "A script utility defining external API connections",
      "A destructor script that purges references"
    ],
    correctAnswer: 1,
    explanation: "__init__ is Python's standard object initializer, setting base traits immediately upon constructor calls."
  },
  {
    id: "q-py-3",
    subject: "Python",
    question: "Which of the following creates an empty set in Python?",
    options: [
      "x = {}",
      "x = set()",
      "x = []",
      "x = ()"
    ],
    correctAnswer: 1,
    explanation: "Calling set() produces an empty set. Running x = {} actually instantiates an empty dictionary (dict)."
  },
  {
    id: "q-py-4",
    subject: "Python",
    question: "What is the time complexity to retrieve an item from a dictionary key in average cases?",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)"
    ],
    correctAnswer: 0,
    explanation: "Python dictionaries use internal hash tables, enabling O(1) constant-time direct dictionary lookup."
  },
  {
    id: "q-py-5",
    subject: "Python",
    question: "How is string formatting handled modernly in Python 3.6+ using prefix notation?",
    options: [
      "Using the % operator formatting parameters",
      "Calling format() on every string value",
      "Directly inserting parameters inside an f-string (e.g. f'Hello {name}')",
      "Explicitly parsing strings using type casts"
    ],
    correctAnswer: 2,
    explanation: "f-strings (Formatted String Literals) are prefixed with 'f' or 'F' and execute Python expressions in-place cleanly."
  },

  // DBMS
  {
    id: "q-db-1",
    subject: "DBMS",
    question: "What does SQL stand for?",
    options: [
      "Simple Query Language",
      "Standard Query Language",
      "Structured Query Language",
      "Synthesis Query Listing"
    ],
    correctAnswer: 2,
    explanation: "SQL remains the industry standard declarative relational database querying notation."
  },
  {
    id: "q-db-2",
    subject: "DBMS",
    question: "Which sub-clause filters aggregation groupings in SQL?",
    options: [
      "WHERE",
      "HAVING",
      "ORDER BY",
      "GROUP BY"
    ],
    correctAnswer: 1,
    explanation: "The HAVING clause specifies filtering parameters on aggregated rows produced under GROUP BY configurations."
  },
  {
    id: "q-db-3",
    subject: "DBMS",
    question: "Which ACID property guarantees that database changes survive system crashes?",
    options: [
      "Atomicity",
      "Consistency",
      "Isolation",
      "Durability"
    ],
    correctAnswer: 3,
    explanation: "Durability guarantees completed transaction updates persist dynamically in non-volatile memory even during fatal grid failures."
  },
  {
    id: "q-db-4",
    subject: "DBMS",
    question: "In Third Normal Form (3NF), which type of dependency is strictly removed?",
    options: [
      "Multivalued dependencies",
      "Partial dependencies on a composite primary key",
      "Transitive dependencies",
      "Join dependencies"
    ],
    correctAnswer: 2,
    explanation: "3NF builds on 2NF by removing transitive dependencies, where non-prime attributes determine other non-prime attributes."
  },
  {
    id: "q-db-5",
    subject: "DBMS",
    question: "What represents a structural table definition schema inside conventional DBMS setups?",
    options: [
      "A relation card",
      "An attribute array",
      "A metadata manifest",
      "A table schema or relation"
    ],
    correctAnswer: 3,
    explanation: "A relation describes the table name, set of attributes, and their strict data domains."
  },

  // Data Structures
  {
    id: "q-ds-1",
    subject: "Data Structures",
    question: "Which data structure operates on a Last In First Out (LIFO) model?",
    options: [
      "Queue",
      "Stack",
      "Circular Buffer",
      "Hash Map"
    ],
    correctAnswer: 1,
    explanation: "Stacks push and pop nodes from the same end, making the last inserted element the first one to exit."
  },
  {
    id: "q-ds-2",
    subject: "Data Structures",
    question: "What is the average time complexity of searching a Binary Search Tree (BST) with N nodes?",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)"
    ],
    correctAnswer: 1,
    explanation: "A balanced BST halves candidate nodes in every traversal level, achieving a search performance of O(log N)."
  },
  {
    id: "q-ds-3",
    subject: "Data Structures",
    question: "Which Tree traversal outputs values of a Binary Search Tree in non-decreasing sorted order?",
    options: [
      "Pre-order Traversal",
      "Post-order Traversal",
      "In-order Traversal",
      "Level-order Traversal"
    ],
    correctAnswer: 2,
    explanation: "In-order (Left, Root, Right) walks numerical nodes incrementally inside standard BST configurations."
  },
  {
    id: "q-ds-4",
    subject: "Data Structures",
    question: "What is the worst-case scenario time complexity of Quick Sort?",
    options: [
      "O(N log N)",
      "O(N)",
      "O(N²)",
      "O(log N)"
    ],
    correctAnswer: 2,
    explanation: "Worst-case (O(N²)) occurs when the partition pivot consistently matches extreme minimum or maximum boundaries in a sorted array."
  },
  {
    id: "q-ds-5",
    subject: "Data Structures",
    question: "What characterizes a fundamental connected acyclic graph?",
    options: [
      "A network loop",
      "A tree",
      "A directed bento-mesh",
      "A bipartite matrix"
    ],
    correctAnswer: 1,
    explanation: "A tree is precisely defined in graph theory as an undirected, connected graph with no cycles."
  },

  // Computer Networks
  {
    id: "q-cn-1",
    subject: "Computer Networks",
    question: "Which protocol is connection-oriented and ensures reliable byte-stream transport?",
    options: [
      "UDP",
      "IP",
      "TCP",
      "ICMP"
    ],
    correctAnswer: 2,
    explanation: "TCP uses error detection, sequencing, flow control, and handshakes to establish solid reliable connections."
  },
  {
    id: "q-cn-2",
    subject: "Computer Networks",
    question: "What is the length size of an IPv6 address?",
    options: [
      "32 bits",
      "64 bits",
      "128 bits",
      "256 bits"
    ],
    correctAnswer: 2,
    explanation: "IPv6 uses 128-bit hexadecimal strings, vastly expanding address pools beyond IPv4's 32-bit limits."
  },
  {
    id: "q-cn-3",
    subject: "Computer Networks",
    question: "Which hardware device operates explicitly at Layer 3 (Network Layer) to direct packets between subnetworks?",
    options: [
      "Network Hub",
      "Network Switch (Layer 2)",
      "Router",
      "Fiber Ethernet Transceiver"
    ],
    correctAnswer: 2,
    explanation: "Routers parse IP headers to make cross-network packet routing decisions."
  },
  {
    id: "q-cn-4",
    subject: "Computer Networks",
    question: "What is the primary operational task of the Domain Name System (DNS)?",
    options: [
      "Assign dynamic dynamic local configurations",
      "Translate user-friendly domain URLs (like google.com) to machine IP coordinates",
      "Encrypt transport socket pipelines",
      "Verify email metadata"
    ],
    correctAnswer: 1,
    explanation: "DNS acts as the phonebook of the Internet, mapping alphabetical names to numeric machine IP targets."
  },
  {
    id: "q-cn-5",
    subject: "Computer Networks",
    question: "Which packet control flag initializes the standard TCP 3-way handshake?",
    options: [
      "ACK",
      "SYN",
      "FIN",
      "URG"
    ],
    correctAnswer: 1,
    explanation: "The client sends a SYN (Synchronize) sequence packet, requesting synchronization to begin communication."
  }
];

// Doubt Assistant Chat Presets
export const ChatbotPresets = [
  {
    question: "What is Machine Learning?",
    response: "🤖 **Machine Learning (ML)** is a science that empowers systems to identify traits and make data-driven decisions autonomously:\n\n*   **Supervised**: Learns on fully labeled datasets (e.g., house rates forecasting).\n*   **Unsupervised**: Detects groupings on unlabeled entries (e.g., customer clusters).\n*   **Reinforcement**: Learns through trial-and-error rewards (e.g., chess bots).\n\n💡 *Tip: Combine deep theories with coding exercises in Python line libraries!*"
  },
  {
    question: "Explain Normalization.",
    response: "🗄️ **Normalization** is a layout system structuring databases to eliminate redundancies and guard against anomalies:\n\n*   **1NF**: Requires atomicity (single, indivisible attributes in rows).\n*   **2NF**: Meets 1NF + removes partial key dependencies.\n*   **3NF**: Meets 2NF + removes transitive dependencies (non-prime determinants).\n\n🚀 *Normalization optimizes transactions and ensures relational safety!*"
  },
  {
    question: "What is a Neural Network?",
    response: "🧠 **Artificial Neural Networks (ANN)** are ML models styled after natural brains:\n\n1.  **Input Layer**: Accepts numerical features.\n2.  **Hidden Layers**: Evaluates feature weights and applies Activation Functions (e.g., ReLU, Sigmoid).\n3.  **Output Layer**: Produces prediction results.\n\n⚙️ *Backpropagation corrects weights dynamically by traveling error backward!*"
  },
  {
    question: "Difference between SQL and NoSQL?",
    response: "⚖️ Here is a structural breakdown comparison:\n\n| Feature | Relational (SQL) | Non-Relational (NoSQL) |\n| :--- | :--- | :--- |\n| **Model** | Tabular, defined columns | Document (JSON), Key-Value, Graph |\n| **Schema** | Static, pre-declared schema | Fluid, dynamic attribute additions |\n| **Scaling** | Vertically (strong machines) | Horizontally (cluster grids) |\n| **Property**| Strict ACID compliance | Mostly BASE (Eventually Consistent) |\n\n👍 *Use SQL for tight commercial logs, and NoSQL for rapid web payloads!*"
  },
  {
    question: "What is Python used for?",
    response: "🐍 **Python** is an extremely popular language used extensively in:\n\n*   **AI, ML & DL**: Powerhouse libraries (TensorFlow, PyTorch, Scikit-Learn).\n*   **Data Analysis**: Streamlined tools like Pandas, NumPy, Matplotlib.\n*   **Backend Services**: Fast frameworks (Django, FastAPI, Flask).\n*   **Web Scraping & Automation**: Heavy scripts (Selenium, Beautiful Soup).\n\n🔥 *Its simple syntax makes it the #1 choice for academic and SaaS designs!*"
  }
];

// Fallback search answers for custom chatbots
export const CustomResponseKeywords: BotResponse[] = [
  {
    keywords: ["dbms", "sql", "database", "query", "nosql", "table", "schema"],
    response: "🗄️ **Database Concept Assistant**: Database architectures typically leverage either **SQL (Structured)** or **NoSQL (Fluid)** schemes.\n\n*   Use **Primary Keys** for unique ID constraints.\n*   Implement **Indexes** to optimize query times from O(N) linear scans to O(log N) tree scans.\n*   Ensure transacting systems respect standard **ACID rules** (Atomicity, Consistency, Isolation, Durability)."
  },
  {
    keywords: ["ai", "machine learning", "deep learning", "neural", "supervised", "unsupervised"],
    response: "🤖 **AI Concept Assistant**: Modern AI centers heavily around statistical computing. Models ingest high-dimensional vectors, apply weights, correct errors dynamically via gradients, and output classification or prediction parameters.\n\n*   **Regression**: Forecasts real numbers.\n*   **Classification**: Assigns labels.\n*   **LLMs**: Power dialogue assistants with self-attention masks."
  },
  {
    keywords: ["python", "variable", "function", "class", "list", "dict", "tuple"],
    response: "🐍 **Python Code Assistant**: Python is a high-level interpreted programming language. It uses indentation to mark code blocks instead of curly, heavy brackets.\n\n*   **List**: Mutable ordered bracket arrays.\n*   **Tuple**: Immutable safe tuples.\n*   **Dict**: Fast hash key retrieval map.\n\nKeep code modular with helper functions!"
  },
  {
    keywords: ["network", "tcp", "ip", "dns", "http", "packet", "router", "port"],
    response: "🌐 **Networks Specialist**: Information flows via packets bound under layered rules (like the standard **TCP/IP** stack):\n\n*   **Layer 4 (Transport)**: TCP coordinates reliable stream delivery, UDP handles fast unreliable messages.\n*   **Layer 3 (Network)**: Routing structures use IPv4 or IPv6 targets.\n*   **Layer 7 (Application)**: Protocols like HTTP, DNS, and SSH enable system exchanges."
  },
  {
    keywords: ["study", "exam", "grade", "score", "schedule", "time", "test"],
    response: "📅 **Performance Coach**: Preparing for exams is highly visual and strategic. Use **Active Recall** (such as our flashcard tool) and **Spaced Repetition** (revisiting old topics every 3-4 days) to optimize learning.\n\nDo not cram! Divide study schedules into 40-minute blocks separated by 5-minute cognitive breaks."
  }
];

// Dynamic Note Summarizer Algorithm helper
export function generateDynamicSummary(text: string): string {
  if (!text || text.trim().length < 15) {
    return "⚠️ Please enter a detailed paragraph of notes (at least 15 characters) so StudyMate AI can analyze and condense the material effectively.";
  }

  const cleanedText = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
  const words = cleanedText.split(/\s+/);
  
  // Exclude common grammatical filler words
  const stopWords = new Set([
    "the", "is", "and", "of", "in", "to", "a", "an", "that", "it", "for", "on", "with", "as", "by", "at", "this", "from", "are", "be", "or", "which", "was", "were", "but"
  ]);
  
  // Frequency mapping
  const freqMap: Record<string, number> = {};
  words.forEach(word => {
    if (word.length > 3 && !stopWords.has(word)) {
      freqMap[word] = (freqMap[word] || 0) + 1;
    }
  });

  // Extract top keywords
  const sortedKeywords = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(entry => entry[0]);

  // If no substantial words found, default lists
  const keywordsToUse = sortedKeywords.length > 0 ? sortedKeywords : ["study material", "concept", "data", "analysis"];

  // Segmenting first block for a professional review paragraph
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const coreThesis = sentences[0] ? sentences[0] + "." : "Analyzed academic material.";

  // Generate bullet summaries based on the identified core keywords
  const keyBulletedAnalysis = keywordsToUse.map((keyword, index) => {
    const capitalizedWord = keyword.charAt(0).toUpperCase() + keyword.slice(1);
    const definitions = [
      `represents a central element within this text context, forming the cornerstone of the primary discussion.`,
      `serves as a critical operative term highlighting structural characteristics or dynamic mechanisms in the input.`,
      `indicates procedural attributes that require direct active-recall examination prior to final exam cycles.`,
      `anchors secondary classifications, widely discussed in standard academic journals and student materials.`
    ];
    return `**${capitalizedWord}** ${definitions[index % definitions.length]}`;
  });

  // Construct a polished multi-section AI Response
  return `### 📊 AI Summary Output
  
  **Core Overview:**
  "${coreThesis} The text primarily establishes foundational parameters centered heavily around structural optimization principles."
  
  **🔑 Key Themes Identified:**
  ${keyBulletedAnalysis.map(bullet => `*   ${bullet}`).join("\n")}
  
  **💡 Study & Revision Recommendation:**
  *   *Focus Area:* Pay special attention to interactions between **${keywordsToUse[0]}** and **${keywordsToUse[1] || "related subtopics"}**.
  *   *Review Cycle:* Practice writing high-yield explanations of these themes without viewing the text. Expected exam relevance value: **High (90%+)**.`;
}
