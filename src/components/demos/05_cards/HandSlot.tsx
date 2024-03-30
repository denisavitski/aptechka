export const HandSlot: JSX.Component<{ id: string }> = (props) => {
  return <component data-id={props.id}>{props.children}</component>
}
