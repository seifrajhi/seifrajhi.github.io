import React from "react"
import { TweenLite, Circ } from "gsap/all"
import "gsap/CSSPlugin"

import "./hero-header.css"

// Bright Theme - rgba(31, 43, 49) || 95, 99, 106
// Dark Theme - rgba(228, 232, 240)

class Circle {
  constructor(ctx, pos, rad, color) {
    this.drawCtx = ctx
    this.pos = pos || null
    this.radius = rad || null
    this.color = color || null
  }

  draw = function () {
    if (!this.active) return

    this.drawCtx.beginPath()
    this.drawCtx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false)
    this.drawCtx.fillStyle = this.color.replace("{alpha}", this.active)
    this.drawCtx.fill()
  }
}

// Util
const getDistance = (p1, p2) => {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
}

class NNBackground extends React.Component {
  componentDidMount() {
    const { theme } = this.props
    console.log(theme)
    const colors = this.getColorsByTheme(theme)

    ;(function () {
      const pointSize = 3
      const pointDensity = 20
      const kNeighbors = 6

      // https://codepen.io/MarcoGuglielmelli/pen/lLCxy
      const largeHeader = document.getElementById("hero-header")

      let width = largeHeader.offsetWidth
      let height = largeHeader.offsetHeight

      let target = {
        x: width * 0.5,
        y: height * 0.4,
      }

      const canvas = document.getElementById("neural-network-background")
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext("2d")

      let points = []

      const initHeader = () => {
        // create points
        points = []

        // todo: points get constrained when page was loaded with a smaller screen and then it was resized back to full size
        for (let x = 0; x < width; x = x + width / pointDensity) {
          for (let y = 0; y < height; y = y + height / pointDensity) {
            let px = x + (Math.random() * width) / pointDensity,
              py = y + (Math.random() * height) / pointDensity

            points.push({
              x: px,
              originX: px,
              y: py,
              originY: py,
            })
          }
        }

        // for each point find the 5 closest points
        for (let i = 0; i < points.length; i++) {
          let closest = []
          let p1 = points[i]

          for (let j = 0; j < points.length; j++) {
            let p2 = points[j]

            if (p1 === p2) {
              continue
            }

            var placed = false

            for (var k = 0; k < kNeighbors; k++) {
              if (placed) continue

              if (closest[k] === undefined) {
                closest[k] = p2
                placed = true
              }
            }

            for (var k = 0; k < kNeighbors; k++) {
              if (placed) continue

              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2
                placed = true
              }
            }
          }

          p1.closest = closest
        }

        // assign a circle to each point
        for (var i in points) {
          points[i].circle = new Circle(
            ctx,
            points[i],
            pointSize + Math.random() * pointSize,
            colors["circleColor"]
          )
        }
      }

      // Event handling
      const addListeners = () => {
        if (!("ontouchstart" in window)) {
          largeHeader.addEventListener("mousemove", mouseMove)
        }

        window.addEventListener("resize", resize)
      }

      const mouseMove = (e) => {
        if (canvas !== e.path[0]) {
          // track only mouse movements on the canvas element.
          // Otherwise, coordinates would be related to small children elements
          return
        }

        let posx = 0,
          posy = 0

        let rect = e.target.getBoundingClientRect()

        posx = e.pageX - rect.left // x position within the element.
        posy = e.pageY - rect.top // y position within the element.

        target.x = posx
        target.y = posy
      }

      const resize = () => {
        width = largeHeader.offsetWidth
        height = largeHeader.offsetHeight

        canvas.width = width
        canvas.height = height
      }

      // animation
      const initAnimation = () => {
        animate()

        for (var i in points) {
          shiftPoint(points[i])
        }
      }

      const animate = () => {
        ctx.clearRect(0, 0, width, height)

        for (var i in points) {
          // detect points in range
          if (Math.abs(getDistance(target, points[i])) < 4000) {
            points[i].active = 0.3
            points[i].circle.active = 0.5
          } else if (Math.abs(getDistance(target, points[i])) < 20000) {
            points[i].active = 0.1
            points[i].circle.active = 0.3
          } else if (Math.abs(getDistance(target, points[i])) < 40000) {
            points[i].active = 0.02
            points[i].circle.active = 0.1
          } else {
            points[i].active = 0
            points[i].circle.active = 0
          }

          drawLines(points[i], colors["lineColor"])
          points[i].circle.draw()
        }

        requestAnimationFrame(animate)
      }

      const shiftPoint = (p) => {
        TweenLite.to(p, 1 + 1 * Math.random(), {
          x: p.originX - 50 + Math.random() * 100,
          y: p.originY - 50 + Math.random() * 100,
          ease: Circ.easeInOut,
          onComplete: function () {
            shiftPoint(p)
          },
        })
      }

      // Canvas manipulation
      const drawLines = (p, lineColor) => {
        if (!p.active) return

        for (var i in p.closest) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.closest[i].x, p.closest[i].y)
          ctx.strokeStyle = lineColor.replace("{alpha}", p.active)
          ctx.stroke()
        }
      }

      // Main
      initHeader()
      initAnimation()
      addListeners()
    })()
  }

  getColorsByTheme(theme) {
    if (theme === "dark") {
      return {
        circleColor: `rgba(228, 232, 240, {alpha})`,
        lineColor: `rgba(228, 232, 240, {alpha})`,
      }
    }

    return {
      circleColor: `rgba(95, 99, 106, {alpha})`,
      lineColor: `rgba(95, 99, 106, {alpha})`,
    }
  }

  render() {
    return <canvas id="neural-network-background"></canvas>
  }
}

export default NNBackground
