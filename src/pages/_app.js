import { ApolloProvider } from '@apollo/client';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import client from '../config/apollo';
import '../styles/globals.css';
import MomentUtils from '@date-io/moment';
import PropiedadState from '../context/propiedades/PropiedadState';

const MyApp = ({ Component, pageProps }) => {
	return(
		<ApolloProvider client={client}>
			<PropiedadState>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<Component {...pageProps} />
				</MuiPickersUtilsProvider>
			</PropiedadState>
		</ApolloProvider>
	);
}

export default MyApp;