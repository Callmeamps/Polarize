---
name: html-to-image
description: |
  Convert HTML/DOM artifacts into image assets (PNG/JPG) using headless browser capture.
  Trigger: "render html to image", "convert dom to png", "snapshot artifact", "save html as image".
triggers:
  - "render html to image"
  - "convert dom to png"
  - "snapshot artifact"
  - "save html as image"
od:
  mode: prototype
  category: image-generation
  preview:
    type: html
  inputs:
    - name: artifact_path
      type: string
      required: true
    - name: format
      type: enum
      values: [png, jpg]
      default: png
---

# html-to-image

Convert HTML/DOM artifacts into image assets (PNG/JPG) for project assets — UI mockups, icons, illustrations, social cards, and visual references.

## What it does

Renders HTML or active UI artifacts into image files. Perfect for snapshots, exports, or social media sharing.

## How to use

1.  Specify the path to the HTML artifact you want to render.
2.  The skill will use a headless browser to capture the content.
3.  Specify the desired image format (png or jpg).

Example prompt: "Convert index.html to a png image."
