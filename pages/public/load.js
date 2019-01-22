import React, {useState} from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import {Wallet, util} from 'oip-hdmw'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Modal from '@material-ui/core/Modal'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {Lock} from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import withLayout from '../../lib/withLayout'
import LoadFormStyles from '../../components/styles/LoadFormStyles'
import LoadWarningModalStyles from '../../components/styles/LoadWarningModalStyles'

let LoadWarning = (props) => {
	const {open, classes, mnemonic, setLoadWarning} = props
	
	return <Modal open={open} className={classes.modal}>
		<Paper className={`${classes.paper}`} >
			<Typography color="error" align={'center'} className={classes.cautionTyp}>CAUTION</Typography>
			<Typography color="primary" align={"center"} paragraph={true} className={classes.warningTyp}>
				This mnemonic is your KEY. DO NOT LOSE THIS. Burn it into your mind. Write it down.
				Store it, save it, hide it, but do not forget it. It is your wallet.
			</Typography>
			<Typography color="error" align={'center'} paragraph={true} className={classes.mnemonicTyp}>{mnemonic}</Typography>
			<Link href={{pathname: '/', query:{mnemonic}}} passHref>
				<Button
					className={`${classes.continueButtons} ${classes.continueButton}`}
					variant={'contained'}
					color={'primary'}
					onClick={() => {
						//
					}}
				>I understand</Button>
			</Link>
			<Button
				className={`${classes.continueButtons} ${classes.cancelButton}`}
				variant={'contained'}
				onClick={(e) => {
					e.preventDefault()
					setLoadWarning(false)
				}}
			>
				Cancel
			</Button>
		</Paper>
	</Modal>
}

LoadWarning = withStyles(LoadWarningModalStyles)(LoadWarning)

function LoadForm(props) {
	const {classes, loadWallet} = props
	
	const [mnemonic, setMnemonic] = useState('');
	const [displayLoadWarning, setLoadWarning] = useState(false)
	
	const generateMnemonic = (e) => {
		e.preventDefault()
		let wallet = new Wallet(undefined, {discover: false})
		let mnemonic = wallet.getMnemonic()
		setMnemonic(mnemonic)
	}
	
	const lockLoadButton = !util.isMnemonic(mnemonic);
	
	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Lock className={classes.lockIcon}/>
				<Typography component="h1" variant="h5" align={'center'}>
					Enter a Mnemonic to Load Your Wallet
				</Typography>
				<form className={classes.form}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Mnemonic</InputLabel>
						<Input id="mnemonic" name="mnemonic" autoComplete="mnemonic" autoFocus
						       value={mnemonic}
						       onChange={(e) => setMnemonic(e.target.value)}
						/>
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						// disableFocusRipple={true}
						// disableRipple={true}
						className={`${classes.submit} ${classes.gmButton}`}
						onClick={(e) => {
							generateMnemonic(e)
						}}
					>
						Generate Mnemonic
					</Button>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={(e) => {
							e.preventDefault();
							setLoadWarning(true)
						}}
						disabled={lockLoadButton}
					>
						Load Wallet
					</Button>
				</form>
				<LoadWarning
					open={displayLoadWarning}
					loadWallet={loadWallet}
					mnemonic={mnemonic}
					setLoadWarning={setLoadWarning}
				/>
				<Typography align={'center'} className={classes.aboutTyp}>
					If you don't know what a mnemonic is, or want to know more about this wallet,
					see our <Link href='/public/about' as={'/about'} ><a className={classes.aboutLink}>About Page</a></Link>.
				</Typography>
			</Paper>
		</main>
	);
}

LoadForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withLayout(withStyles(LoadFormStyles)(LoadForm))
