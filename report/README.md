# Report

This directory contains the groff mom source for my Honours Project report.

To generate the report as `report.pdf`, run `./compile`.

## Adding Images

Images are kept under the `img` directory. To include images, the images
but be converted to PDFs. To do this, run

```bash
convert <image> <desired pdf name>
```

Then run

```bash
pdfinfo <pdf>
```

to get the size of the image in points from the `Page size` row. This is
needed for including the image in the mom source with the `PDF_IMAGE` macro.

To insert an image in the source, use

```
.PDF_IMAGE img/<pdf> <width>p <height>p SCALE <desired scale
```

Example:

```
.PDF_IMAGE img/uc1.pdf 657p 152p SCALE 75
```

## `save-commands.json`

The `save-commands.json` file is used to automatically recompile the
report PDF every time `report.mom` is saved in the Atom text editor. It
uses the [save-commands](https://atom.io/packages/save-commands) Atom
package.

## `pdf-link.tmac`

This is a file for replacing the `PDF_LINK` mom macro to enable displaying
just the section number, instead of the whole name. For details, see email
correspondence with Peter Schaffter.
