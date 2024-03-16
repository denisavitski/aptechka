export const XXX: JSX.Component<{ x: number }> = (props) => {
  return <div>132</div>
}

export const App = () => {
  return (
    <div>
      <XXX x={123}></XXX>
      <XXX x={555}></XXX>
    </div>
  )
}
