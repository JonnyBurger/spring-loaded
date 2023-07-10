# Remotion video

The logo of Apples "Spring Loaded" event implemented in Remotion.

Steps taken:

1. Traced the logo manually in Sketch and exported as SVG
2. Use plain JS `getTotalLength()` and `getPointAtLength()` methods to calculate coordinates of path
3. Draw for each point a `<div>` - this is super slow unfortunately but not noticeable in the end product
4. Use `interpolateColors` and `spring` functions to animate

![Logo Animation](out.gif)

<p align="center">
  <a href="https://github.com/JonnyBurger/remotion-logo">
    <img src="https://github.com/JonnyBurger/remotion-logo/raw/main/withtitle/element-0.png">
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Start Preview**

```console
npm start
```

**Render video**

```console
npm run build
```

**Server render demo**

```console
npm run server
```

See [docs for server-side rendering](https://www.remotion.dev/docs/ssr) here.

**Upgrade Remotion**

```console
npm run upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/JonnyBurger/remotion/issues/new).

## License
This code: MIT  
The Remotion license: Note that for some entities a company license is needed. Read [the terms here](https://github.com/JonnyBurger/remotion/blob/main/LICENSE.md).
