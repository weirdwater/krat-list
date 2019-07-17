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
}

interface Session {
  user: User
  id: string
  created: Date
  ip: string
}

interface Consumption {
  id: string
  reporter: User
  consumer: User
  reported: Date
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
  consumptions: Consumption[]
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