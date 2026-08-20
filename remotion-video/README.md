# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Structure for YouTube editing

Remotion here is used as a templated graphics/overlay layer (intros, lower-thirds,
caption burn-ins) rather than a raw-footage editor — cut and assemble raw footage in
a normal editor, then use these templates for anything repeated across videos.

```
src/
  compositions/   # one file per reusable template (registered in Root.tsx)
  components/     # small reusable pieces used by compositions
  data/           # per-video JSON (captions, titles) passed in via --props
  Root.tsx        # registers every composition
public/           # logos, fonts, music
```

Two starter templates are included:

- **Intro** — a title card with title/subtitle/colors as props.
- **CaptionOverlay** — burns in timed captions from a `{ captions: [{ text, start, end }] }`
  JSON file; the clip's length is derived automatically from the last caption's `end` time.

To make a new video from a template, copy `src/data/example-captions.json`, edit it,
and render with that file's props:

```console
npx remotion render CaptionOverlay out/my-video.mp4 --props=src/data/my-video.json
```

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
