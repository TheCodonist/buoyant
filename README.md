# buoyant
Minimal jQuery plugin for Floating Background Particles

## Default Attribute

* containerClass: "buoyant-container",
* parentClass: 'buoyant-parent',
* elementClass: '',
* imgSrc: '',
* width: 50,
* height: -1,
* backgroundColor: "black",
* fps: 60,
* numberOfItems: 4,
* minRadius: 10,
* maxRadius: 40,
* minSpeed: 20,
* maxSpeed: 70,
* collisionEfficiency: 1,
* gravity: 0,
* trails: false,
* colliding: false
          

## Example

### CSS

```css
.circles{
  display: block;
}
```

### JavaScript
```javascript
  jQuery( "#circleArea" ).buoyant({
            numberOfItems: 4,
            minRadius: 5,
            maxRadius: 25,
            elementClass: 'circles'
        });
```
