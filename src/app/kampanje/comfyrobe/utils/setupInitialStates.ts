import gsap from 'gsap'

export const setupInitialStates = (
  cards: HTMLElement[],
  texts: HTMLElement[]
) => {
  gsap.set(cards, { zIndex: i => cards.length - i })

  gsap.set(texts, {
    autoAlpha: 0,
    x: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'block'
  })

  if (texts[0]) gsap.set(texts[0], { autoAlpha: 1, x: 0 })
}
