# buoyant

Minimal jQuery plugin for Floating Background Particles

## Default Attribute

- containerClass: "buoyant-container",
- parentClass: "buoyant-parent",
- elementClass: "",
- imgSrc: "",
- width: 50,
- height: -1,
- backgroundColor: "black",
- fps: 60,
- numberOfItems: 4,
- minRadius: 10,
- maxRadius: 40,
- minSpeed: 20,
- maxSpeed: 70,
- collisionEfficiency: 1,
- gravity: 0,
- trails: false,
- colliding: false

## Example

https://hamayunaziz.github.io/

### CSS

```css
.circles {
  display: block;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  opacity: 0.5;
  z-index: -1;
}
```

### JavaScript

```javascript
jQuery("#circleArea").buoyant({
  numberOfItems: 4,
  minRadius: 5,
  maxRadius: 25,
  elementClass: "circles"
});
```
