import { MenuItem, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LocalMenu from '../../components/LocalMenu'
import { useConfirm } from '../../components/Prompt'
import RowMenu from '../../components/RowMenu'
import useAlerts from '../../hooks/useAlerts'
import { get } from '../../lib'

export default function () {
  const confirm = useConfirm()
  const pushAlerts = useAlerts()
  const navigate = useNavigate()

  const [measurements, setMeasurements] = useState([])

  async function deleteClicked(id) {
    const decision = await confirm({
      title: 'Confirmation',
      text: 'Confirm the deletion action.'
    })
    if (decision == 'agree') {
      const { alerts } = await get(`/api/measurement/delete/${id}`)
      pushAlerts(alerts)
      const measurements = measurements.filter(m => m._id != id)
      setMeasurements(measurements)
    }
  }

  async function updateMeasurements() {
    const { measurements } = await get('/api/measurement/list')
    setMeasurements(measurements)
  }

  useEffect(async () => {
    await updateMeasurements()
  }, [])

  const columns = [
    { field: 'height', headerName: 'Height'},
    { field: 'weight', headerName: 'Weight'},
    {
      field: 'createdAt',
      type: 'date',
      headerName: 'Created',
      valueGetter: (params) => {
        return new Date(params.row.createdAt)
      },
    },
    {
      field: 'date',
      type: 'actions',
      renderCell: (params) => (
        <strong>
          <RowMenu>
            <MenuItem onClick={e => navigate('/measurement/edit/' + params.id)}>Edit</MenuItem>
            <MenuItem onClick={e => deleteClicked(params._id)} >Delete</MenuItem>
          </RowMenu>
        </strong>
      )
    },
  ];

  return (
    <>
      <Typography variant='h4'>Measurements</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={measurements}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          getRowId={(row) => row._id}
        />
      </div>
      <LocalMenu>
        {({ close }) => (
          <div>
            <MenuItem
              onClick={() => {
                navigate('/measurement/add')
                close();
              }}
            >
              Add
            </MenuItem>
          </div>
        )}
      </LocalMenu>
    </>
  )
}
