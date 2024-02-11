import { connector } from '..'

const comment = document.createComment('asdada')

connector.subscribe(comment, {
  connectCallback: () => {
    console.log('CONNECT')
  },
  disconnectCallback: () => {
    console.log('DISCONNECT')
  },
})

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    document.body.appendChild(comment)
  } else if (e.key === '2') {
    document.body.removeChild(comment)
  }
})
