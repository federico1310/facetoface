import { ApolloProvider } from '@apollo/client';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import client from '../config/apollo';
import '../styles/globals.css';
import MomentUtils from '@date-io/moment';
import UsuarioState from '../context/usuarios/UsuarioState';

const MyApp = ({ Component, pageProps }) => {
	return(
		<ApolloProvider client={client}>
			<UsuarioState>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<Component {...pageProps} />
				</MuiPickersUtilsProvider>
			</UsuarioState>
		</ApolloProvider>
	);
}

export default MyApp;