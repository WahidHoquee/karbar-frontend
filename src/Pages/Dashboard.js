import React from 'react'
import { Grid } from '@material-ui/core'
import Initializer from '../Components/Dashboard/Initializer'
import Summaries from '../Components/Dashboard/Summaries'
import ApprovedVoucher from '../Components/Dashboard/ApprovedVoucher'
import VoucherApproved from '../Components/Dashboard/VoucherApproved'
import HeadOfAccounts from '../Components/Dashboard/HeadOfAccounts'

const Dashboard = () => {
    return (
        <div style={{margin: '4rem 6rem'}}>
            <Initializer/>
            <Summaries/>
            <Grid container style={{marginTop: '4rem'}} spacing={5}>
                <Grid item xs={6}>
                    <ApprovedVoucher/>
                </Grid>
                <Grid item xs={6}>
                    <VoucherApproved/>
                </Grid>
            </Grid>
            <Grid container style={{marginTop: '4rem'}} spacing={5}>
                <Grid item xs={12}>
                    <HeadOfAccounts/>
                </Grid>
            </Grid>

        </div>
    )
}

export default Dashboard
