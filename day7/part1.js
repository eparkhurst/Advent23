const fs = require('fs');
const path = require('path')

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

// Print the contents or use it as 

const handValues = ['five', 'four', 'full', 'three', 'twop', 'onep', 'hc']
const cardValues = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3','2']

const main = () => {
  const hands = fileContents.split('\n').map(h => {
    const handArr = h.split(' ')
    return {
      hand: handArr[0],
      value: Number(handArr[1]),
      type: getType(handArr[0])
    }
  })
  const sorted = hands.sort((a, b) => {
    const comp = handValues.indexOf(a.type) - handValues.indexOf(b.type)
    if (comp == 0) {
      for (let i = 0; i < a.hand.length; i++) {
        const cardDiff = cardValues.indexOf(a.hand[i]) - cardValues.indexOf(b.hand[i]);
        if (cardDiff !== 0) return cardDiff
      }
    } else return comp
  })
  const len = sorted.length
  const score = sorted.reduce((p,c, i) => {
    const rank = len - i
    p += (rank * c.value)
    return p
  }, 0)
  console.log(score)
}

const getType = (hand) => {
  const dict = hand.split('').reduce((p, c) => {
    if (p[c]) p[c]++
    else {
      p[c] = 1
    }
    return p
  }, {})
  const count = Object.values(dict)
  if (count.includes(5)) return 'five'
  if (count.includes(4)) return 'four'
  if (count.includes(3)) {
    if (count.includes(2)) return 'full'
    else return 'three'
  }
  if (count.includes(2)) {
    const pairs = count.filter(n => n === 2)
    if (pairs.length == 2) return 'twop'
    else return 'onep'
  }
  return 'hc'
}

main()