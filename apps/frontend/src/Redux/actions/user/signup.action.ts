import { Profile } from 'types/dist/ts/schema'
import { auth_local_register } from 'types/src/api/routes/auth_local'
import { actionModule } from '../../dispatch'

const type = 'user:signup'

export type ActionType = {
  type: typeof type
  return: Profile

  payload: auth_local_register
}

const action: actionModule<ActionType> = async function (
  values,
  { dispatch, state },
  { pushNoti, online, offline },
) {
  const profile = await online(helpers =>
    fetch(import.meta.env.VITE_BACKEND_API + '/auth/local/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }),
  )

  pushNoti({ message: `user \`${profile.displayName}\` was created` })

  dispatch({
    type: 'USER_ADD_PROFILE',
    pl: { profile },
  })

  return profile
}

action.type = type
export default action
