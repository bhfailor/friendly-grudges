import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';

import Amplify from 'aws-amplify';
import configuration from './aws-exports';

const appSyncConfiguration =  {
    "aws_appsync_graphqlEndpoint": "https://kywkglkpene2xjdxtumi3yi35q.appsync-api.us-east-2.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-2",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-qnyy4k45efgvvo7htdy455yhd4",
};

Amplify.configure({ ...configuration, ...appSyncConfiguration });

ReactDOM.render(<Application />, document.getElementById('root'));
