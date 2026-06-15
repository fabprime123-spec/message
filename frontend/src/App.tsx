import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {

  return (
    <>
      <div>
        <h2>{"MY APP"}</h2>
        <header>
          <Show when="signed-out">
            <SignInButton mode="modal" />
            <SignUpButton mode='modal' />
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </header>
      </div>
    </>
  )
}

export default App
