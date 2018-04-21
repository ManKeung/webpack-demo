import '../css/components/a.scss'

export function componentA () {
  let ul = document.createElement('ul')

  ul.innerHTML = `
    <li>1</li>
    <li>222</li>
    <li>3334</li>
  `

  return ul
}
