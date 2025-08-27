export const Head: JSX.Component<{
  title: string
}> = (props) => {
  return (
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <title>{props.title}</title>
    </head>
  )
}

Head.template = true
