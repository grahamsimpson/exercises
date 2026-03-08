import { timesTablesQuestions } from './questions/timesTablesQ'
import { fractionsQuestions } from './questions/fractionsQ'
import { decimalsQuestions } from './questions/decimalsQ'
import { percentagesQuestions } from './questions/percentagesQ'
import { wordProblemsQuestions } from './questions/wordProblemsQ'
import { numberSeriesQuestions } from './questions/numberSeriesQ'
import { numberAnalogiesQuestions } from './questions/numberAnalogiesQ'

export const TOPICS = [
  {
    id: 'times-tables',
    title: 'Times Tables',
    emoji: '⚡',
    description: 'Master your tables from 2 to 12 — fast and fun!',
    category: 'number',
    color: 'from-pink-400 to-rose-500',
    questions: timesTablesQuestions,
    lessons: [
      {
        title: 'What are times tables?',
        content: 'Times tables are shortcuts for repeated addition. 4 × 3 means "four groups of three" = 12.',
        example: '7 × 8 = 56\n\nTip: "5, 6, 7, 8 — 56 is 7 × 8!" 🎶',
        kittyTip: "Try singing your tables to a beat — like Times Tables Rock Stars!",
      },
      {
        title: 'Tricky tables: 6, 7, 8, 9',
        content: 'The 6, 7, 8 and 9 times tables are trickiest. Use these tricks:',
        example: '9× table: The digits always add to 9!\n9×3=27 (2+7=9) ✅\n9×7=63 (6+3=9) ✅\n\n6× table: 6 × an even number always ends in that number!\n6×4=24, 6×6=36, 6×8=48',
        kittyTip: "For 6×7, 6×8, 7×8 — just remember: 56=7×8, 42=6×7, 48=6×8. Say them out loud 5 times!",
      },
    ],
    unlocks: ['multiplication', 'division'],
  },
  {
    id: 'fractions',
    title: 'Fractions',
    emoji: '🍕',
    description: 'Slice it up! Learn to add, subtract and compare fractions.',
    category: 'number',
    color: 'from-purple-400 to-pink-500',
    questions: fractionsQuestions,
    lessons: [
      {
        title: 'What is a fraction?',
        content: 'A fraction shows part of a whole. The top number (numerator) says how many parts you have. The bottom number (denominator) says how many equal parts the whole is split into.',
        example: '🍕 A pizza cut into 4 slices:\n\nIf Kitty eats 3 slices, she has eaten ¾ of the pizza\n\n  3 ← numerator (slices eaten)\n  ─\n  4 ← denominator (total slices)',
        kittyTip: "Denominator starts with D for Down — it goes on the bottom!",
      },
      {
        title: 'Adding fractions',
        content: 'To add fractions, the denominators must be the same. If they are different, find a common denominator first.',
        example: '½ + ¼ = ?\n\nStep 1: Make denominators the same\n½ = 2/4\n\nStep 2: Add numerators\n2/4 + 1/4 = 3/4\n\n½ + ¼ = ¾ 🎉',
        kittyTip: "Think of the denominator as the name of the fraction (quarters, thirds...). You can only add things with the same name!",
      },
      {
        title: 'Finding a fraction of an amount',
        content: 'To find a fraction of an amount: DIVIDE by the denominator, MULTIPLY by the numerator.',
        example: '¾ of 20:\n\nStep 1: Divide by 4 → 20 ÷ 4 = 5\nStep 2: Multiply by 3 → 5 × 3 = 15\n\n¾ of 20 = 15 ✅',
        kittyTip: "Remember: Divide first, then multiply. 'D before M' like 'Dinner before Maths'! 😄",
      },
    ],
    unlocks: ['percentages'],
  },
  {
    id: 'decimals',
    title: 'Decimals',
    emoji: '🎯',
    description: 'Hit the decimal point perfectly — place value matters!',
    category: 'number',
    color: 'from-rose-400 to-orange-400',
    questions: decimalsQuestions,
    lessons: [
      {
        title: 'Decimal place value',
        content: 'The decimal point separates whole numbers from parts. Each place has a value 10 times smaller than the one to its left.',
        example: 'In 12.345:\n\n  1 = tens\n  2 = ones\n  . = decimal point\n  3 = tenths (1/10)\n  4 = hundredths (1/100)\n  5 = thousandths (1/1000)',
        kittyTip: "Read decimals like 12.345 as 'twelve point three four five' — say each digit separately after the point!",
      },
      {
        title: 'Adding and subtracting decimals',
        content: 'Always line up the decimal points! Fill in zeros if needed.',
        example: '4.8 + 6.35 =\n\n   4.80\n+  6.35\n──────\n  11.15\n\nTip: Write 4.8 as 4.80 so the columns match!',
        kittyTip: "Line up the dots! The decimal points must be in a straight column.",
      },
    ],
    unlocks: ['percentages'],
  },
  {
    id: 'percentages',
    title: 'Percentages',
    emoji: '💯',
    description: 'Percentages are everywhere — shopping, scores, and more!',
    category: 'number',
    color: 'from-kitty-pink to-kitty-purple',
    questions: percentagesQuestions,
    lessons: [
      {
        title: 'What is a percentage?',
        content: 'Percentage means "out of 100". 50% = 50 out of 100 = ½. They\'re everywhere — sales, test scores, statistics!',
        example: '25% = 25/100 = ¼\n50% = 50/100 = ½\n75% = 75/100 = ¾\n100% = the whole thing',
        kittyTip: "% means 'per cent' — cent means 100, like a century in cricket!",
      },
      {
        title: 'Finding percentages of amounts',
        content: 'Find 10% by dividing by 10. Then use that to find other percentages.',
        example: '35% of 120:\n\n10% of 120 = 12\n30% = 12 × 3 = 36\n5% = 12 ÷ 2 = 6\n35% = 36 + 6 = 42 ✅',
        kittyTip: "Always start with 10% (÷ by 10). Then build up from there — like stacking blocks!",
      },
    ],
    unlocks: ['word-problems'],
  },
  {
    id: 'word-problems',
    title: 'Word Problems',
    emoji: '📖',
    description: 'Real-world maths with Kitty, her family, football and cooking!',
    category: 'reasoning',
    color: 'from-green-400 to-teal-500',
    questions: wordProblemsQuestions,
    lessons: [
      {
        title: 'How to tackle word problems',
        content: 'Word problems need a plan! Follow these 4 steps:',
        example: '1. READ the problem carefully (twice!)\n2. IDENTIFY the numbers and what is being asked\n3. CHOOSE the operation (+ - × ÷)\n4. CALCULATE and CHECK your answer makes sense\n\nExample: "Kitty buys 3 lip glosses at £2.40 each. How much change from £10?"\n→ 3 × £2.40 = £7.20\n→ £10 - £7.20 = £2.80 change ✅',
        kittyTip: "Underline the question at the end of the problem. That tells you exactly what to find!",
      },
    ],
    unlocks: ['number-series', 'number-analogies'],
  },
  {
    id: 'number-series',
    title: 'Number Series',
    emoji: '🔮',
    description: 'CAT4 prep — spot the pattern and find the missing number!',
    category: 'cat4',
    color: 'from-indigo-400 to-purple-500',
    questions: numberSeriesQuestions,
    lessons: [
      {
        title: 'Spotting the rule',
        content: 'In a number series, every number follows a rule. Your job is to find the rule and use it to find the missing number.',
        example: 'Sequence: 3, 5, 8, 12, 17, ?\n\nDifferences: +2, +3, +4, +5, +6\nThe differences increase by 1 each time!\n\nAnswer: 17 + 6 = 23',
        kittyTip: "Always write out the difference between each pair of numbers first. The pattern is often in the differences!",
      },
      {
        title: 'Common patterns',
        content: 'Look out for these common series types:',
        example: '• Adding the same number: 3,6,9,12... (+3)\n• Multiplying: 2,4,8,16... (×2)\n• Square numbers: 1,4,9,16,25... (n²)\n• Fibonacci: 1,1,2,3,5,8... (add previous two)\n• Decreasing: 100,90,80... (-10)',
        kittyTip: "If adding doesn't work, try multiplying. If that doesn't work, look at the differences between differences!",
      },
    ],
    unlocks: [],
  },
  {
    id: 'number-analogies',
    title: 'Number Analogies',
    emoji: '🧠',
    description: 'CAT4 prep — find the hidden rule connecting number pairs!',
    category: 'cat4',
    color: 'from-violet-400 to-fuchsia-500',
    questions: numberAnalogiesQuestions,
    lessons: [
      {
        title: 'What is a number analogy?',
        content: 'A number analogy shows pairs of numbers with a hidden rule. You need to find that rule and apply it to a new number.',
        example: '4 → 16, 3 → 12, 5 → ?\n\nStep 1: What happens to 4 to get 16? (×4)\nStep 2: Check: 3 × 4 = 12 ✓\nStep 3: Apply: 5 × 4 = 20\n\nAnswer: 20',
        kittyTip: "Test your rule on ALL the given pairs before using it on the unknown. A true rule works every time!",
      },
    ],
    unlocks: [],
  },
]

export function getTopicById(id) {
  return TOPICS.find(t => t.id === id)
}

export function selectQuestions(topic, count = 10) {
  const q = [...topic.questions]
  // Shuffle and pick
  for (let i = q.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [q[i], q[j]] = [q[j], q[i]]
  }
  return q.slice(0, Math.min(count, q.length))
}
