import { Maybe } from './fun'
import { Map } from 'immutable'

interface User {
  id: string
  name: string
  email: string
  avatar: Maybe<string>
  created: Date
  updated: Date
  encryptedPassword: string
  emailConfirmed: boolean
  active: boolean
}

interface Session {
  user: User
  id: string
  created: Date
  ip: string
}

interface ConsumptionReport {
  id: string
  reporter: User
  reported: Date
  consumptions: Consumption[]
  group: Group
}

interface Consumption {
  id: string
  consumer: User
  units: number
}

interface Group {
  id: string
  owner: User
  members: User[]
  name: string
  beersPerCase: number
  mlPerBeer: number
  caseRankings: Map<string, CaseRanking>
  casePurchases: CasePurchase[]
  consumptionReports: ConsumptionReport[]
}

interface CaseRanking {
  purchased: number
  consumed: number
  ranking: number
  updated: Date
}

interface CasePurchase {
  id: string
  brand: string
  priceInEuroCents: number
  beerCount: number
  user: User
  purchased: Date
}