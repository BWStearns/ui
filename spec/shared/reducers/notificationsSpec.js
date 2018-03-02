import reducer, {initialState} from 'src/shared/reducers/notifications'

import {
  publishNotification,
  dismissNotification,
  deleteNotification,
} from 'src/shared/actions/notifications'

const notificationID = '000'

const exampleNotification = {
  id: notificationID,
  type: 'success',
  message: 'Hell yeah you are a real notification!',
  created: 'timestamp',
  duration: 5000, // -1 stays until dismissed
  icon: 'zap',
  dismiss: false,
}

const exampleNotifications = [exampleNotification]

describe('Shared.Reducers.notifications', () => {
  it('should publish a notification', () => {
    const actual = reducer(
      initialState,
      publishNotification(exampleNotification)
    )
    const expected = [...initialState, exampleNotification]

    expect(actual).to.equal(expected)
  })

  it('should dismiss a notification', () => {
    const actual = reducer(
      exampleNotifications,
      dismissNotification(notificationID)
    )
    const expected = exampleNotifications.map(n => {
      return n.id === notificationID ? {...n, dismiss: true} : n
    })

    expect(actual).to.equal(expected)
  })

  it('should delete a notification', () => {
    const actual = reducer(
      exampleNotifications,
      deleteNotification(notificationID)
    )
    const expected = exampleNotifications.filter(n => n.id !== notificationID)

    expect(actual).to.equal(expected)
  })
})
