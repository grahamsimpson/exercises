// Times Tables question bank — programmatically generated + static
export function generateTimesTablesQuestions() {
  const questions = []
  let id = 0

  // Generate all table facts 2-12
  for (let table = 2; table <= 12; table++) {
    for (let mult = 1; mult <= 12; mult++) {
      const answer = table * mult
      questions.push({
        id: `tt-${id++}`,
        type: 'input',
        difficulty: table <= 5 ? 1 : table <= 9 ? 2 : 3,
        stem: `What is ${table} × ${mult}?`,
        answer: String(answer),
        acceptedAnswers: [String(answer)],
        hint: `Think of ${table} lots of ${mult}`,
        explanation: `${table} × ${mult} = ${answer}`,
        theme: 'general',
      })
    }
  }

  // Missing number variants
  const pairs = [[3,7],[4,8],[6,7],[7,8],[8,9],[9,6],[11,7],[12,8],[6,9],[7,7]]
  for (const [a, b] of pairs) {
    questions.push({
      id: `tt-m${id++}`,
      type: 'input',
      difficulty: 2,
      stem: `${a} × ? = ${a * b}`,
      answer: String(b),
      acceptedAnswers: [String(b)],
      hint: `What number multiplied by ${a} gives ${a * b}?`,
      explanation: `${a} × ${b} = ${a * b}, so the missing number is ${b}`,
      theme: 'general',
    })
  }

  return questions
}

export const timesTablesQuestions = generateTimesTablesQuestions()
