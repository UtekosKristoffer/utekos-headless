# GSAP Cheatsheet

### GSAP Cheat Sheet

We get it. Syntax can be tricky to remember. Here's a quick reference to some of
the most commonly used parts of GSAP. Most code is linked to the appropriate
page in the [Docs](https://gsap.com/community/contact/)

[Request an addition to the sheet](https://gsap.com/community/contact/)

### Basics [→](https://gsap.com/resources/get-started/)[​](https://gsap.com/cheatsheet#basics- 'Direct link to basics-')

```tsx
// "to" tween - animate to provided values
gsap.to('.selector', {
  // selector text, Array, or object
  x: 100, // any properties (not limited to CSS)
  backgroundColor: 'red', // camelCase
  duration: 1, // seconds
  delay: 0.5,
  ease: 'power2.inOut',
  stagger: 0.1, // stagger start times
  paused: true, // default is false
  overwrite: 'auto', // default is false
  repeat: 2, // number of repeats (-1 for infinite)
  repeatDelay: 1, // seconds between repeats
  repeatRefresh: true, // invalidates on each repeat
  yoyo: true, // if true > A-B-B-A, if false > A-B-A-B
  yoyoEase: true, // or ease like "power2"
  immediateRender: false,
  onComplete: () => {
    console.log('finished')
  }
  // other callbacks:
  // onStart, onUpdate, onRepeat, onReverseComplete
})
```

```tsx
// "from" tween - animate from provided values
gsap.from('.selector', { fromVars })
```

```tsx
// "fromTo" tween (define both start and end values)
gsap.fromTo('.selector', { fromVars }, { toVars })
// special properties (duration, ease, etc.) go in toVars
```

```tsx
// set values immediately (no animation)
gsap.set('.selector', { toVars })
```

### Timelines [→](<https://gsap.com/docs/v3/GSAP/gsap.timeline()/>)[​](https://gsap.com/cheatsheet#timelines- 'Direct link to timelines-')

```tsx
// Create a timeline
let tl = gsap.timeline({
  delay: 0.5,
  paused: true, // default is false
  repeat: 2, // number of repeats (-1 for infinite)
  repeatDelay: 1, // seconds between repeats
  repeatRefresh: true, // invalidates on each repeat
  yoyo: true, // if true > A-B-B-A, if false > A-B-A-B
  defaults: {
    // children inherit these defaults
    duration: 1,
    ease: 'none'
  },
  smoothChildTiming: true,
  autoRemoveChildren: true,
  onComplete: () => {
    console.log('finished')
  }
  // other callbacks:
  // onStart, onUpdate, onRepeat, onReverseComplete
})
```

```tsx
// Sequence multiple tweens
tl.to('.selector', { duration: 1, x: 50, y: 0 })
  .to('#id', { autoAlpha: 0 })
  .to(elem, { duration: 1, backgroundColor: 'red' })
  .to([elem, elem2], { duration: 3, x: 100 })
```

```tsx
// position parameter (controls placement)
tl.to(target, { toVars }, positionParameter)

0.7 // exactly 0.7 seconds into the timeline (absolute)
;('-=0.7') // overlap with previous by 0.7 sec
;('myLabel') // insert at "myLabel" position
;('myLabel+=0.2') // 0.2 seconds after "myLabel"
;('<') // align with start of most recently-added child
;('<0.2') // 0.2 seconds after ^^
;('-=50%') // overlap half of inserting animation's duration
;('<25%') // 25% into the previous animation (from its start)
```

### Control Methods [→](https://gsap.com/resources/get-started/#timeline-control)[​](https://gsap.com/cheatsheet#control-methods- 'Direct link to control-methods-')

```tsx
// retain animation reference to control later
let anim = gsap.to(...); // or gsap.timeline(...);
// most methods can be used as getters or setters
anim.play() // plays forward
.pause()
.resume() // respects direction
.reverse()
.restart()
.timeScale(2) // 2 = double speed, 0.5 = half speed
.seek(1.5) // jump to a time (in seconds) or label
.progress(0.5) // jump to halfway
.totalProgress(0.8) // includes repeats
// when used as setter, returns animation (chaining)

// other useful methods (tween and timeline)
.kill() // immediately destroy
.isActive() // true if currently animating
.then() // Promise
.invalidate() // clear recorded start/end values
.eventCallback() // get/set an event callback

// timeline-specific methods
// add label, tween, timeline, or callback
.add(thing, position)
// calls function at given point
.call(func, params, position)
// get an Array of the timeline's children
.getChildren()
// empties the timeline
.clear()
// animate playhead to a position linearly
.tweenTo(timeOrLabel, {vars})
// ^^ with both start and end positions
.tweenFromTo(from, to, {vars})
```

### Eases [→](https://gsap.com/docs/v3/Eases/)[​](https://gsap.com/cheatsheet#eases- 'Direct link to eases-')

```tsx
// see greensock.com/ease-visualizer
ease: 'none' // no ease (same as "linear")

// basic core eases
;('power1', 'power2', 'power3', 'power4', 'circ', 'expo', 'sine')
// each has .in, .out, and .inOut extensions
// i.e. "power1.inOut"

// expressive core eases
;('elastic', 'back', 'bounce', 'steps(n)')

// in EasePack plugin (not core)
;('rough', 'slow', 'expoScale(1, 2)')

//expressive plugin eases
;(CustomEase, CustomWiggle, CustomBounce)
```

### ScrollTrigger [→](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)[​](https://gsap.com/cheatsheet#scrolltrigger- 'Direct link to scrolltrigger-')

```tsx
scrollTrigger: {
  trigger: ".selector", // selector or element
  start: "top center",  // [trigger] [scroller] positions
  end: "20px 80%", // [trigger] [scroller] positions
  // or relative amount: "+=500"
  scrub: true, // or time (in seconds) to catch up
  pin: true, // or selector or element to pin
  markers: true, // only during development!
  toggleActions: "play pause resume reset",
  // other actions: complete reverse none
  toggleClass: "active",
  fastScrollEnd: true, // or velocity number
  containerAnimation: tween, // linear animation
  id: "my-id",
  anticipatePin: 1, // may help avoid jump
  snap: {
    snapTo: 1 / 10, // progress increment
    // or "labels" or function or Array
    duration: 0.5,
    directional: true,
    ease: "power3",
    onComplete: callback,
    // other callbacks: onStart, onInterrupt
  },
  pinReparent: true, // moves to documentElement during pin
  pinSpacing: false,
  pinType: "transform", // or "fixed"
  pinnedContainer: ".selector",
  preventOverlaps: true, // or arbitrary string
  once: true,
  endTrigger: ".selector", // selector or element
  horizontal: true, // switches mode
  invalidateOnRefresh: true, // clears start values on refresh
  refreshPriority: 1, // influence refresh order
  onEnter: callback
  // other callbacks:
  // onLeave, onEnterBack, onLeaveBack, onUpdate,
  // onToggle, onRefresh, onRefreshInit, onScrubComplete
}
```

### Plugins [→](https://gsap.com/docs/v3/Plugins)[​](https://gsap.com/cheatsheet#plugins- 'Direct link to plugins-')

```tsx
// Register GSAP plugins (once) before using them
gsap.registerPlugin(Draggable, TextPlugin)

// Available plugins
;(Draggable,
  DrawSVGPlugin,
  EaselPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  MotionPathHelper,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  ScrollToPlugin,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  TextPlugin)
```

### Installation [→](https://gsap.com/docs/v3/Installation)[​](https://gsap.com/cheatsheet#installation- 'Direct link to installation-')

```tsx
// Import and register GSAP
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
gsap.registerPlugin(DrawSVGPlugin)
```

### Utility Methods [→](https://gsap.com/docs/v3/GSAP/UtilityMethods)[​](https://gsap.com/cheatsheet#utility-methods- 'Direct link to utility-methods-')

```tsx
// accessible through gsap.utils.foo()
checkPrefix() // get relevant browser prefix for property
clamp() // clamp value to range
distribute() // distribute value among and array
getUnit() // get unit of string
interpolate() // interpolate between values
mapRange() // map one range to another
normalize() // map a range to the 0-1 range
pipe() // sequence function calls
random() // generates a random value
selector() // get a scoped selector function
shuffle() // shuffles an array in-place
snap() // snap a value to either increment or array
splitColor() // splits color into RGB array
toArray() // convert array-like thing to array
unitize() // adds specified unit to function results
wrap() // place number in range, wrapping to start
wrapYoyo() // place number in range, wrapping in reverse
```

### Nesting Timelines[​](https://gsap.com/cheatsheet#nesting-timelines 'Direct link to Nesting Timelines')

```tsx
function scene1() {
  let tl = gsap.timeline();
  tl.to(...).to(...); // build scene 1
  return tl;
}

function scene2() {
  let tl = gsap.timeline();
  tl.to(...).to(...); // build scene 2
  return tl;
}

let master = gsap.timeline()
  .add(scene1())
  .add(scene2(), "-=0.5") // overlap slightly
```

### Misc...[​](https://gsap.com/cheatsheet#misc 'Direct link to Misc...')

```tsx
// Get the current value of a property
gsap.getProperty('#id', 'x') // 20
gsap.getProperty('#id', 'x', 'px') // "20px"
```

```tsx
// Set GSAP's global tween defaults
gsap.defaults({ ease: 'power2.in', duration: 1 })
```

```tsx
// Configure GSAP's non-tween-related settings
gsap.config({
  autoSleep: 60,
  force3D: false,
  nullTargetWarn: false,
  trialWarn: false,
  units: {left: "%", top: "%", rotation: "rad"}
});nullTargetWarn: false,  trialWarn: false,  units: {left: "%", top: "%", rotation: "rad"}});
```

```tsx
// Register an effect for reuse
gsap.registerEffect({
  name: 'fade',
  effect: (targets, config) => {
    return gsap.to(targets, {
      duration: config.duration,
      opacity: 0
    })
  },
  defaults: { duration: 2 },
  extendTimeline: true
})

// Now we can use it like this
gsap.effects.fade('.box')
// Or directly on timelines
tl.fade('.box', { duration: 3 })
```

```tsx
// Add listener with gsap.ticker
gsap.ticker.add(myFunction)
function myFunction(time, deltaTime, frame) {
  // Executes on every tick after
  // the core engine updates
}
// To remove the listener later...
gsap.ticker.remove(myFunction)
```

```tsx
// faster way to repeatedly set property than .set()
let setX = gsap.quickSetter('#id', 'x', 'px')
document.addEventListener('mousemove', e => setX(e.clientX))

// quickTo - for animation!
let xTo = gsap.quickTo('#id', 'x', { duration: 0.4, ease: 'power3' })
document.addEventListener('mousemove', e => xTo(e.pageX))
```

## GSDevTools

## Description

GSDevTools gives you a **visual UI** for interacting with and debugging
[GSAP](https://gsap.com/docs/v3/GSAP/) animations, complete with advanced
playback controls, keyboard shortcuts, global synchronization and more. Jump to
specific scenes, set in/out points, play in slow motion to reveal intricate
details, and even switch to a "minimal" mode on small screens. GSDevTools makes
building and reviewing GSAP animations simply delightful.

```tsx
gsap.registerPlugin(GSDevTools)
```

Minimal usage

```tsx
GSDevTools.create()
```

### CDN

https://cdn.jsdelivr.net/npm/gsap@3.15/dist/GSDevTools.min.js

## Get Started[​](https://gsap.com/docs/v3/Plugins/GSDevTools/#get-started 'Direct link to Get Started')

1. Import GSDevTools through a script tag or import the plugin from the GSAP
   package

   ```tsx
   <script src='https://cdn.jsdelivr.net/npm/gsap@3.15/dist/GSDevTools.min.js'></script>
   ```

   ```tsx
   import { GSDevTools } from 'gsap/GSDevTools'
   ```

2. Create a GSDevTools instance

   ```tsx
   GSDevTools.create()
   ```

**_That's it!_**

Though we suggest linking it to a particular animation instance because then
GSDevTools doesn't need to worry all the global syncing of things. You can do
that by setting the `animation` value of the dev tools instance:

```tsx
var tl = gsap.timeline();tl.to(...); // add your animations, etc.// link it to this specific timeline:GSDevTools.create({animation: tl});
```

### Demo

```tsx
HTML CSS JS
//timeline animates green and orange
var tl = gsap.timeline()
tl.to(".orange", {duration: 1, x: "100vw", xPercent: -100})
  .to(".green", {duration: 2, x: "100vw", xPercent: -100, ease:"bounce"})

//separate tween with a delay which makes it play after the timeline
gsap.to(".purple", {duration: 1, x: "100vw", xPercent: -100, rotation: 360, delay: 3})

//instantiate GSDevTools with default settings
GSDevTools.create();

// GSDevTools will control all animations on the Global Timeline
```

### Select an animation by id

Any GSAP animation (tween or timeline) can be assigned an `id` (a string) which
causes it to show up in the animation menu. That makes it easy to jump to any
scene. Notice how the timeline _and_ each tween below have an `id` assigned:

```tsx
//give the timeline and child tweens their own id.
var tl = gsap.timeline({ id: 'timeline' })

tl.to('.orange', { duration: 1, x: 700, id: 'orange' }).to('.green', {
  duration: 2,
  x: 700,
  ease: 'bounce',
  id: 'green'
}) //give this tween an id

gsap.to('.grey', { duration: 1, x: 700, rotation: 360, delay: 3, id: 'grey' })

//instantiate GSDevTools with default settings
GSDevTools.create()
```

```javascript
//give the timeline and child tweens their own id.
var tl = gsap.timeline({ id: 'timeline' })
tl.to('.orange', { duration: 1, x: '100vw', xPercent: -100, id: 'orange' }).to(
  '.green',
  { duration: 2, x: '100vw', xPercent: -100, ease: 'bounce', id: 'green' }
)

//give this tween an id
gsap.to('.purple', {
  duration: 1,
  x: '100vw',
  xPercent: -100,
  rotation: 360,
  delay: 3,
  id: 'purple'
})

//instantiate GSDevTools with default settings
GSDevTools.create()

//GSDevTools will control all animations on the Global Timeline and provide access via the drop-down menu to any animation with an id.
```

## Persistence between refreshes[​](https://gsap.com/docs/v3/Plugins/GSDevTools/#persistence-between-refreshes 'Direct link to Persistence between refreshes')

For added convenience, when you manually set the in/out points, animation,
`timeScale`, or looping state in the UI, they persist between refreshes! This
means you can drag the in/out points to isolate a particular section and then
tweak the code, hit refresh, and see the changes immediately within that cropped
area. Any values set in the `GSDevTools.create({...})` method will override
manual selections. Set `persist: false` to disable persistence. If you encounter
persistence contamination (e.g. setting `timeScale` in one affects another),
simply assign a unique `id` to the GSDevTools instance (the recorded values are
segregated by `id`, session, and domain).

## Config Object[​](https://gsap.com/docs/v3/Plugins/GSDevTools/#config-object 'Direct link to Config Object')

GSDevTools can be configured extensively. Optionally define any of these
properties in the config object:

### Property

### Description

- #### animation[](https://gsap.com/docs/v3/Plugins/GSDevTools/#animation)
  \[_String_ | _Animation_\] - If you define an animation, like
  `animation: myTimeline`, `animation: myTween` or `animation: "id"`, that
  animation will be initially selected. By default, the global timeline is
  selected.
- #### container[](https://gsap.com/docs/v3/Plugins/GSDevTools/#container)
  \[_String_ | _Element_\] - Specify the container element for GSDevTools, like:
  `"#devTools"` or `document.getElementById ("devTools")`.
- #### css[](https://gsap.com/docs/v3/Plugins/GSDevTools/#css)
  \[_Object_ | _String_\] - The CSS you want on the outer div, like
  `{width: "50%", bottom: "30px"}` or a string of CSS like
  `"width: 50%; bottom: 30px"`.
- #### globalSync[](https://gsap.com/docs/v3/Plugins/GSDevTools/#globalSync)
  Boolean - Animations can be kept in context and synchronized with the root
  timeline (scrubbing one scrubs them all). To enable this, set
  `globalSync: true` to hook it to the global timeline.
- #### hideGlobalTimeline[](https://gsap.com/docs/v3/Plugins/GSDevTools/#hideGlobalTimeline)
  Boolean - If `true`, the Global Timeline will be removed from the animation
  menu.
- #### id[](https://gsap.com/docs/v3/Plugins/GSDevTools/#id)
  String - A unique string to identify the GSDevTools instance.
- #### inTime[](https://gsap.com/docs/v3/Plugins/GSDevTools/#inTime)
  \[_Number_ | _String_\] - Position of the in marker (time, in seconds, or
  label or animation `id`).
- #### keyboard[](https://gsap.com/docs/v3/Plugins/GSDevTools/#keyboard)
  Boolean - If `true` (the default), keyboard shortcuts will work. Note: Only
  one GSDevTools instance can listen for keyboard shortcuts.
- #### loop[](https://gsap.com/docs/v3/Plugins/GSDevTools/#loop)
  Boolean - Initial loop state.
- #### minimal[](https://gsap.com/docs/v3/Plugins/GSDevTools/#minimal)
  Boolean - If `true`, the UI will only show minimal controls (scrubber,
  play/pause, and timeScale). Note: When the screen is less than 600px it
  automatically switches to minimal mode anyway.
- #### outTime[](https://gsap.com/docs/v3/Plugins/GSDevTools/#outTime)
  \[_Time_ | _Label_\] - Position of the out marker (time, in seconds, or label,
  or animation `id`).
- #### paused[](https://gsap.com/docs/v3/Plugins/GSDevTools/#paused)
  Boolean - Initial paused state.
- #### persist[](https://gsap.com/docs/v3/Plugins/GSDevTools/#persist)
  Boolean - By default, GSDevTools remembers the in and out points, selected
  animation, timeScale, and looping state between refreshes in the same domain
  session, but you can disable that behavior by setting `persist: false`.
- #### timeScale[](https://gsap.com/docs/v3/Plugins/GSDevTools/#timeScale)
  Number - Initial `timeScale`.
- #### visibility[](https://gsap.com/docs/v3/Plugins/GSDevTools/#visibility)
  String - `"auto"` causes the controls to automatically hide when you roll off
  of them for about 1 second, and return when you move your mouse over the area
  again.

## Keyboard Controls[​](https://gsap.com/docs/v3/Plugins/GSDevTools/#keyboard-controls 'Direct link to Keyboard Controls')

- **SPACEBAR:** play/pause
- **UP/DOWN ARROWS:** increase/decrease timeScale
- **LEFT ARROW:** rewind
- **RIGHT ARROW:** jump to end
- **L:** toggle loop
- **I:** set the in point to current position of playhead
- **O:** set the out point to current position of playhead
- **H:** hide/show toggle

## Tips and tricks[​](https://gsap.com/docs/v3/Plugins/GSDevTools/#tips-and-tricks 'Direct link to Tips and tricks')

- It is almost always best to define an animation directly like
  `GSDevTools.create({ animation: yourAnimation... });` so that it doesn't need
  to worry about mergine all the global animations in.
- Clicking the GSAP logo (bottom right) gets you right to the
  [docs](https://gsap.com/docs/v3/)!
- Double-click on the in/out marker(s) to reset them both immediately.
- If the playback UI is obscuring part of your animation, just tap the "H" key
  to hide it (and again to bring it back) - you can still use all the keyboard
  shortcuts even when it's invisible.

## Advanced demos

We purposefully chose very basic animations for the demos above, but here's one
that illustrates how easy GSDevTools makes it to control and debug even complex
animation sequences.

```javascript
sap.defaults({ease:"power3.inOut"});

var master = gsap.timeline({delay:0.5, repeat:-1, repeatDelay:0.5});
var mt = 0.85;
var es = "power2.out";

gsap.set("#demo", {autoAlpha:1});
gsap.set(".bottomFighter", {rotation:180, y:758, transformOrigin:"center center"});
gsap.set("#stage, #luke, #darth, #chewie, #r2d2", {autoAlpha:0});

function flyBy() {
  var tl = gsap.timeline({defaults:{duration:2}});
  tl.add("fighter");
  tl.from(".bottomFighter, .topFighter", {duration:0.1, autoAlpha:0}, "fighter");
  tl.fromTo(".topFighter", {x:-1000}, {x:2500, ease:"none"}, "fighter");
  tl.fromTo(".bottomFighter", {x:2500}, {x:-1000, ease:"none"}, "fighter");
  tl.to(".topLine", {attr:{x2:2500}, ease:"none"}, "fighter");
  tl.to(".bottomLine", {attr:{x1:-1000}, ease:"none"}, "fighter");
  tl.to(".bottomFighter, .topFighter", {duration:0.1, autoAlpha:0}, "-=0.1");
  tl.to(".topCut", {y:418, ease:es}, "vanish");
  tl.to(".bottomCut", {y:-341, ease:es}, "vanish");
  tl.to(".smallLine", {duration:1, attr:{x1:749, x2:751}, ease:es});
  return tl;
}

function bladeCut() {
  var tl = gsap.timeline();
  tl.from("#saber path, #saber rect, #saber circle",  {duration:0.6, scale:0, transformOrigin:"center center", ease:"elastic(1, 0.5)", stagger:0.05}, );
  tl.from("#bladeMaskRect", {duration:0.8, y:512});
  tl.to("#saber", {duration:2, rotation:360, svgOrigin:"750 500"}, "spin");
  tl.from("#stageOutline", {duration:2, drawSVG:0}, "spin");
  tl.to("#bladeMaskRect", {y:512, ease:es});
  tl.to("#saber",  {duration:0.25, autoAlpha:0, ease:"none"});
  return tl;
}

function leiaStage() {
  var tl = gsap.timeline();
  tl.to("#stage", {autoAlpha:1});
  tl.from("#leia path", {duration:1.1, scale:0, transformOrigin:"center center", ease:"elastic(1, 0.5)", stagger:0.15});
```

### Warning

GSDevTools doesn't work with ScrollTrigger-driven animations because that would
be logically impossible to have the scrollbar and the GSDevTools scrubber both
control the same animation.

## **Methods**

```typescript
.create( config:Object ) : GSDevTools
```
