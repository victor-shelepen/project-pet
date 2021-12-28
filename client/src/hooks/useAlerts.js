import { useSnackbar } from 'notistack'

export default function () {
  const { enqueueSnackbar } = useSnackbar()

  function pushAlerts(alerts) {
    for (const alert of alerts) {
      enqueueSnackbar(alert.message, {
        variant: alert.severity
      })
    }
  }

  return pushAlerts
}