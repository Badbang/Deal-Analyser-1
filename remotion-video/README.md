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

Starter templates included:

- **Intro** — a title card with title/subtitle/colors as props.
- **Outro** — a closing card (same shape as Intro, different copy).
- **CaptionOverlay** — burns in timed captions from a `{ captions: [{ text, start, end }] }`
  JSON file; the clip's length is derived automatically from the last caption's `end` time.
- **MasterVideo** — stitches Intro → CaptionOverlay → Outro into one continuous render
  with fade transitions between scenes (via `@remotion/transitions`), so a full video
  comes out of a single render call. Its duration is derived automatically too.

## Using an existing .srt transcript

If you already have a `.srt` subtitle file (exported from YouTube, Whisper, an
editor, etc.), convert it straight to the captions JSON format instead of typing
captions by hand:

```console
npm run captions:from-srt -- path/to/your-file.srt src/data/my-video.json
```

That writes `src/data/my-video.json` with a `captions` array your video is ready to use.

To make a new video, copy `src/data/example-captions.json` (or use the SRT
converter above), edit the captions, and render `MasterVideo` with a props file
containing `introTitle`, `introSubtitle`, `accentColor`, `backgroundColor`,
`captions`, `outroTitle`, and `outroSubtitle`:

```console
npx remotion render MasterVideo out/my-video.mp4 --props=src/data/my-video.json
```

Individual templates (`Intro`, `Outro`, `CaptionOverlay`) can still be rendered on
their own the same way, if you just want one piece rather than the full pipeline.

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
