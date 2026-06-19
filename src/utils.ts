/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * A lightweight, bulletproof renderer that parses simple markdown strings
 * (bold notation, list bullets, etc.) into secure, styled HTML strings.
 */
export function parseSimpleMarkdown(markdown: string): string {
  if (!markdown) return "";
  
  // Escape general dangerous tags
  let html = markdown
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Parse headers: ### Title -> <h4 class="font-semibold text-cyan-400 mt-4 mb-2 text-base">Title</h4>
  html = html.replace(/^### (.*$)/gim, '<h4 class="font-bold text-cyan-400 mt-4 mb-2 text-base">$1</h4>');
  
  // Parse bolding: **text** -> <span class="font-semibold text-indigo-200">text</span>
  html = html.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-indigo-300">$1</span>');
  
  // Parse italics/emphasis: *text* or _text_
  html = html.replace(/\*(.*?)\*/g, '<span class="italic text-gray-300">$1</span>');
  
  // Parse simple table tags (for SQL vs NoSQL)
  if (html.includes("|")) {
    const lines = html.split("\n");
    let tableHtml = '<div class="overflow-x-auto my-3"><table class="min-w-full text-xs text-left text-gray-300 border border-slate-800 rounded-lg">';
    let inTable = false;
    let headerParsed = false;

    lines.forEach(line => {
      if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
        inTable = true;
        // Ignore lines that just contain dividers: | :--- | :--- |
        if (line.includes("---")) {
          return;
        }
        const cells = line.split("|").map(c => c.trim()).filter(Boolean);
        tableHtml += "<tr>";
        cells.forEach(cell => {
          // Re-add bolding in table cells
          const cellContent = cell.replace(/&lt;strong&gt;(.*?)&lt;\/strong&gt;/g, "<strong>$1</strong>");
          if (!headerParsed) {
            tableHtml += `<th class="px-3 py-2 bg-slate-900 border-b border-slate-800 text-cyan-400 font-semibold">${cellContent}</th>`;
          } else {
            tableHtml += `<td class="px-3 py-2 border-b border-slate-800 bg-slate-950/40">${cellContent}</td>`;
          }
        });
        tableHtml += "</tr>";
        headerParsed = true;
      } else {
        if (inTable) {
          tableHtml += "</table></div>";
          inTable = false;
        }
      }
    });
    if (inTable) {
      tableHtml += "</table></div>";
    }
    
    // Replace markdown table lines block with the compiled table markdown
    const startTableIdx = html.indexOf("|");
    const endTableIdx = html.lastIndexOf("|") + 1;
    html = html.substring(0, startTableIdx) + tableHtml + html.substring(endTableIdx);
  }

  // Parse lines starting with *   or -   to styled lists
  const lines = html.split("\n");
  let inList = false;
  let formattedOutput = "";

  lines.forEach(line => {
    const cleanLine = line.trim();
    if (cleanLine.startsWith("* ") || cleanLine.startsWith("- ") || cleanLine.startsWith("*") && cleanLine.length > 2) {
      if (!inList) {
        formattedOutput += '<ul class="list-disc pl-5 my-2 space-y-1 text-gray-300 text-xs sm:text-sm">';
        inList = true;
      }
      const listItemContent = cleanLine.substring(cleanLine.indexOf(" ") + 1);
      formattedOutput += `<li>${listItemContent}</li>`;
    } else {
      if (inList) {
        formattedOutput += "</ul>";
        inList = false;
      }
      // Keep general text paragraphs or headers
      if (cleanLine.length > 0) {
        formattedOutput += `<p class="my-1 text-xs sm:text-sm leading-relaxed">${line}</p>`;
      } else {
        formattedOutput += '<div class="h-1"></div>';
      }
    }
  });

  if (inList) {
    formattedOutput += "</ul>";
  }

  return formattedOutput;
}

/**
 * Interface definition for study schedule slot
 */
export interface ScheduleDay {
  dayNumber: number;
  phase: string;
  focusTopic: string;
  allottedHours: number;
  tasks: string[];
  tips: string;
}

/**
 * Interactive Study Schedule Generator
 * Calculates timeline plans based on dynamic target date countdowns, subjects, and daily availability.
 */
export function generateStudyPlan(subject: string, examDateStr: string, dailyHours: number): ScheduleDay[] {
  const defaultSchedule: ScheduleDay[] = [
    {
      dayNumber: 1,
      phase: "Preconstruct & Core Mapping",
      focusTopic: `Audit current exam templates and set up glossary structures for ${subject}.`,
      allottedHours: dailyHours,
      tasks: ["Catalog key formulas", "Outline critical syllabus parameters", "Review highest-yield lecture indexes"],
      tips: "Eliminate distractions. 45-minute sprint blocks with 5-minute active recovery breaks."
    },
    {
      dayNumber: 2,
      phase: "Deep Comprehension Dive",
      focusTopic: `In-depth processing of complicated diagrams, schemas, and theories in ${subject}.`,
      allottedHours: dailyHours,
      tasks: ["Write 3 dynamic notes worksheets", "Convert long readings into core summaries", "Deconstruct textbook case studies"],
      tips: "Explain concepts out loud to a virtual study buddy or record yourself."
    },
    {
      dayNumber: 3,
      phase: "Active Recall Blast",
      focusTopic: `Testing knowledge integrity using targeted flashcards and diagnostic challenges.`,
      allottedHours: dailyHours,
      tasks: ["Complete 3 sets of flashcard drills", "Solve 10 academic short-answer questions", "Formulate definitions without viewing books"],
      tips: "Focus on fragility. Intentionally seek errors and immediately write correction guides."
    },
    {
      dayNumber: 4,
      phase: "High-Fidelity Mock Exam",
      focusTopic: `Simulating exact test pacing and debugging timing bottlenecks.`,
      allottedHours: dailyHours,
      tasks: ["Sit for a timed practice test", "Refine multiple choice guessing algorithms", "Mark answers against reference key criteria"],
      tips: "Practice in a quiet environment matching prospective exam center environments."
    },
    {
      dayNumber: 5,
      phase: "Final Polish & Wrap",
      focusTopic: `Closing fragility variables and stabilizing mental state models.`,
      allottedHours: dailyHours,
      tasks: ["Skim notes summarizer outputs", "Complete a light 15-minute quick quiz review", "Finalize hydration and pack physical utilities"],
      tips: "Get at least 8 hours of deep REM sleep tonight to consolidate memory nodes."
    }
  ];

  // Calculate days difference
  if (!examDateStr) return defaultSchedule;
  const examDate = new Date(examDateStr);
  const currentDate = new Date();
  
  // Clear times to strictly evaluate dates
  examDate.setHours(0,0,0,0);
  currentDate.setHours(0,0,0,0);
  
  const diffTime = examDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // If exam is in the past, or today, adjust
  if (diffDays <= 0) {
    return [
      {
        dayNumber: 1,
        phase: "Immediate Damage Control",
        focusTopic: `Urgent micro-burst crash course review in ${subject}.`,
        allottedHours: Math.max(dailyHours, 4),
        tasks: ["Rapid-fire flashcard flipping", "Run 1 complete random quiz", "Prioritize sleep node over sleep-deprived memorization"],
        tips: "Review summaries only. Do not attempt long readings or complex original theories right now."
      }
    ];
  }

  // Create a dynamic length schedule (Max 6 steps, tailored for student clarity)
  const stepsCount = Math.min(Math.max(diffDays, 3), 6);
  const schedule: ScheduleDay[] = [];

  const phases = [
    "Core Exploration",
    "Systematic Processing",
    "Conceptual Consolidation",
    "Interactive Recall Drills",
    "Diagnostic Mock Testing",
    "Peak Optimization"
  ];

  const focusPoints = [
    `Establish structural outline nodes and scan key chapters of ${subject}.`,
    `Refine dynamic lecture references and translate heavy text into core summaries.`,
    `Target fragile mathematical formula chains and architectural models.`,
    `Run high-intensity active-recall cycles on StudyMate Flashcards.`,
    `Simulate exact testing environments under strict countdown intervals.`,
    `Calibrate mental confidence grids and finalize summary skimming.`
  ];

  for (let i = 0; i < stepsCount; i++) {
    const isFirst = i === 0;
    const isLast = i === stepsCount - 1;
    let phaseIndex = Math.floor((i / stepsCount) * phases.length);
    if (isFirst) phaseIndex = 0;
    if (isLast) phaseIndex = phases.length - 1;

    const phase = phases[phaseIndex];
    const focusTopic = focusPoints[phaseIndex];
    const allottedHours = dailyHours;

    // Custom tasks per step based on step positioning
    let tasks: string[] = [];
    if (i === 0) {
      tasks = [`Map high-level syllabus nodes for ${subject}`, `Retrieve standard formulas`, `Highlight high-priority modules`];
    } else if (isLast) {
      tasks = [`Skim dynamic summarizes`, `Perform light MCQ review (10 questions)`, `Set up packing checklists`];
    } else if (i === stepsCount - 2) {
      tasks = [`Run 20-minute timed mock tests`, `Audit fragile mistake logs`, `Re-verify definition accuracy`];
    } else {
      tasks = [
        `Complete active-recall drills using Subject material`,
        `Flesh out diagram relationships and flow patterns`,
        `Answer 5 conceptual practice questions`
      ];
    }

    const tipsList = [
      "Keep variables high-level. Create brain-maps tracing module associations.",
      "Integrate practical code or real-world use cases to cement formulas.",
      "Explain your fragile topics concisely. If you can't teach it, review it.",
      "Optimize study pacing. Utilize a styled focus timer with intermittent pauses.",
      "Correct errors with extreme focus. Mistakes are learning fuel.",
      "Protect your focus today. Do not stress over gaps; secure current gains."
    ];
    const tips = tipsList[phaseIndex % tipsList.length];

    schedule.push({
      dayNumber: i + 1,
      phase,
      focusTopic,
      allottedHours,
      tasks,
      tips
    });
  }

  return schedule;
}
