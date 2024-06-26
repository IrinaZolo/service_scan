export const ACCESS_KEY = "s-access";
export const USERNAME_KEY = "s-login";
export const EXPIRE_KEY = "s-expire";
export const DOCS_KEY = "s-docs";
export const SEARCH_KEY = "s-search-req";
export const SEARCH_RESPONSE_KEY = "s-search-res";

export interface AuthResponse {
  accessToken: string;
  expire: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface IWhyUsCards {
  id: number;
  icon: string;
  description: string;
}

export interface IRates {
  id: number;
  icon: string;
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  installment?: string;
  services: string[];
  color: string;
  active: boolean;
  textColor: string;
}

interface IDateState {
  dateValue: string;
  textValue: string;
}

export interface ISearchState {
  tonality: FullSearchData["searchContext"]["targetSearchEntitiesContext"]["tonality"];
  startDate: IDateState;
  endDate: IDateState;
  checkedParams: Record<ParamsType, boolean>;
  isLoading: boolean;
}

interface TargetSearchEntity {
  type: string;
  sparkId?: null | number;
  entityId?: null | number;
  inn: number | null;
  maxFullness: boolean;
  inBusinessNews: null | boolean;
}

export interface FullSearchData {
  intervalType: string;
  histogramTypes: string[];
  issueDateInterval: {
    startDate: string;
    endDate: string;
  };
  searchContext: {
    targetSearchEntitiesContext: {
      targetSearchEntities: TargetSearchEntity[];
      onlyMainRole: boolean;
      tonality: "any" | "positive" | "negative";
      onlyWithRiskFactors: boolean;
      riskFactors: {
        and: [];
        or: [];
        not: [];
      };
      themes: {
        and: [];
        or: [];
        not: [];
      };
    };
    themesFilter: {
      and: [];
      or: [];
      not: [];
    };
  };
  searchArea: {
    includedSources: [];
    excludedSources: [];
    includedSourceGroups: [];
    excludedSourceGroups: [];
    includedDistributionMethods: [];
    excludedDistributionMethods: [];
  };
  attributeFilters: {
    excludeTechNews: boolean;
    excludeAnnouncements: boolean;
    excludeDigests: boolean;
  };
  similarMode: string;
  limit: number | null;
  sortType: string;
  sortDirectionType: string;
}

interface SearchItem {
  encodedId: string;
  influence: number;
  similarCount: number;
}

interface SearchMapping {
  sparkId?: number;
  inn: string;
  entityIds?: number[];
}

export interface SearchDataResponse {
  items: SearchItem[];
  mappings: SearchMapping[];
}

export interface SearchData {
  inn: string;
  startDate: string;
  endDate: string;
  limit: string;
}

export enum ParamsEnum {
  maxCompleteness = "Признак максимальной полноты",
  businessContext = "Упоминания в бизнес-контексте",
  mainRoleInPublication = "Главная роль в публикации",
  withRiskFactorsOnly = "Публикации только с риск-факторами",
  includeTechnicalMarketNews = "Включать технические новости рынков",
  includeAnnouncementsAndCalendars = "Включать анонсы и календари",
  includeNewsReports = "Включать сводки новостей",
}

export type ParamsType =
  | ParamsEnum.maxCompleteness
  | ParamsEnum.businessContext
  | ParamsEnum.mainRoleInPublication
  | ParamsEnum.withRiskFactorsOnly
  | ParamsEnum.includeTechnicalMarketNews
  | ParamsEnum.includeAnnouncementsAndCalendars
  | ParamsEnum.includeNewsReports;

interface IParam {
  id: number;
  name: ParamsType;
}

export const ParamsList: IParam[] = [
  { id: 1, name: ParamsEnum.maxCompleteness },
  { id: 2, name: ParamsEnum.businessContext },
  { id: 3, name: ParamsEnum.mainRoleInPublication },
  { id: 4, name: ParamsEnum.withRiskFactorsOnly },
  { id: 5, name: ParamsEnum.includeTechnicalMarketNews },
  { id: 6, name: ParamsEnum.includeAnnouncementsAndCalendars },
  { id: 7, name: ParamsEnum.includeNewsReports },
];

interface SuggestedCompany {
  sparkId: number;
  inn: string;
  ogrn: string;
  searchPrecision: string;
}

interface Company {
  suggestedCompanies: SuggestedCompany[];
  resolveInfo: {
    resolveApproaches: string[];
  };
  tags: string[];
  isSpeechAuthor: boolean;
  localId: number;
  name: string;
  entityId: number;
  isMainRole: boolean;
}

interface Theme {
  localId: number;
  name: string;
  entityId: number;
  tonality: string;
  participant?: {
    localId: number;
    type: string;
  };
}

interface Location {
  code: {
    countryCode: string;
    regionCode: string;
  };
  localId: number;
  name: string;
  isMainRole: boolean;
}

export interface DocumentData {
  ok: {
    schemaVersion: string;
    id: string;
    version: number;
    issueDate: string;
    url: string;
    source: {
      id: number;
      groupId: number;
      name: string;
      categoryId: number;
      levelId: number;
    };
    dedupClusterId: string;
    title: {
      text: string;
      markup: string;
    };
    content: {
      markup: string;
    };
    entities: {
      companies: Company[];
      people: [];
      themes: Theme[];
      locations: Location[];
    };
    attributes: {
      isTechNews: boolean;
      isAnnouncement: boolean;
      isDigest: boolean;
      influence: number;
      wordCount: number;
      coverage: {
        value: number;
        state: string;
      };
    };
    language: string;
  };
  fail: {
    id: string;
    errorCode: number;
    errorMessage: string;
  };
}

export interface IdsData {
  ids: string[];
}
