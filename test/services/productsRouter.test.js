import assert from 'node:assert'
import supertest from 'supertest'

import {config} from '../../src/config/config.js' 

const httpClient = supertest(`http://localhost:${config.port}`)