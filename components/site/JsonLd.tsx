/**
 * Renders a structured-data block. The serialisation is the whole point of the
 * component, which is why the `dangerouslySetInnerHTML` is contained here
 * rather than repeated in every page that needs schema.
 */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
