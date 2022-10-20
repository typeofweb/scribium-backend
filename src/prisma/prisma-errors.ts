import type { Prisma } from '@prisma/client';

export interface InputValueTooLong extends Prisma.PrismaClientKnownRequestError {
  code: 'P2000';
  meta: {
    column_name: string;
  };
}

export interface RecordNotFound extends Prisma.PrismaClientKnownRequestError {
  code: 'P2001';
  meta: {
    model_name: string;
    argument_name: string;
    argument_value: string;
  };
}

export interface UniqueKeyViolation extends Prisma.PrismaClientKnownRequestError {
  code: 'P2002';
  meta: {
    constraint: /* @todo */ object;
    target: string[];
  };
}

export interface ForeignKeyViolation extends Prisma.PrismaClientKnownRequestError {
  code: 'P2003';
  meta: {
    field_name: string;
  };
}

export interface ConstraintViolation extends Prisma.PrismaClientKnownRequestError {
  code: 'P2004';
  meta: {
    database_error: string;
  };
}

export interface StoredValueIsInvalid extends Prisma.PrismaClientKnownRequestError {
  code: 'P2005';
  meta: {
    field_value: string;
    field_name: string;
  };
}

export interface TypeMismatch extends Prisma.PrismaClientKnownRequestError {
  code: 'P2006';
  meta: {
    field_value: string;
    model_name: string;
    field_name: string;
  };
}

export interface TypeMismatchInvalidCustomType extends Prisma.PrismaClientKnownRequestError {
  code: 'P2007';
  meta: {
    database_error: string;
  };
}

export interface QueryParsingFailed extends Prisma.PrismaClientKnownRequestError {
  code: 'P2008';
  meta: {
    query_parsing_error: string;
    query_position: string;
  };
}

export interface QueryValidationFailed extends Prisma.PrismaClientKnownRequestError {
  code: 'P2009';
  meta: {
    query_validation_error: string;
    query_position: string;
  };
}

export interface RawQueryFailed extends Prisma.PrismaClientKnownRequestError {
  code: 'P2010';
  meta: {
    code: string;
    message: string;
  };
}

export interface NullConstraintViolation extends Prisma.PrismaClientKnownRequestError {
  code: 'P2011';
  meta: {
    constraint: /* @todo */ object;
  };
}

export interface MissingRequiredValue extends Prisma.PrismaClientKnownRequestError {
  code: 'P2012';
  meta: {
    path: string;
  };
}

export interface MissingRequiredArgument extends Prisma.PrismaClientKnownRequestError {
  code: 'P2013';
  meta: {
    argument_name: string;
    field_name: string;
    object_name: string;
  };
}

export interface RelationViolation extends Prisma.PrismaClientKnownRequestError {
  code: 'P2014';
  meta: {
    relation_name: string;
    model_a_name: string;
    model_b_name: string;
  };
}

export interface RelatedRecordNotFound extends Prisma.PrismaClientKnownRequestError {
  code: 'P2015';
  meta: {
    details: string;
  };
}

export interface InterpretationError extends Prisma.PrismaClientKnownRequestError {
  code: 'P2016';
  meta: {
    details: string;
  };
}

export interface RecordsNotConnected extends Prisma.PrismaClientKnownRequestError {
  code: 'P2017';
  meta: {
    relation_name: string;
    parent_name: string;
    child_name: string;
  };
}

export interface ConnectedRecordsNotFound extends Prisma.PrismaClientKnownRequestError {
  code: 'P2018';
  meta: {
    details: string;
  };
}

export interface InputError extends Prisma.PrismaClientKnownRequestError {
  code: 'P2019';
  meta: {
    details: string;
  };
}

export interface ValueOutOfRange extends Prisma.PrismaClientKnownRequestError {
  code: 'P2020';
  meta: {
    details: string;
  };
}

export interface TableDoesNotExist extends Prisma.PrismaClientKnownRequestError {
  code: 'P2021';
  meta: {
    table: string;
  };
}

export interface ColumnDoesNotExist extends Prisma.PrismaClientKnownRequestError {
  code: 'P2022';
  meta: {
    column: string;
  };
}

export interface InconsistentColumnData extends Prisma.PrismaClientKnownRequestError {
  code: 'P2023';
  meta: {
    message: string;
  };
}

export interface PoolTimeout extends Prisma.PrismaClientKnownRequestError {
  code: 'P2024';
  meta: {
    connection_limit: number;
    timeout: number;
  };
}

export interface RecordRequiredButNotFound extends Prisma.PrismaClientKnownRequestError {
  code: 'P2025';
  meta: {
    cause: string;
  };
}

export interface UnsupportedFeature extends Prisma.PrismaClientKnownRequestError {
  code: 'P2026';
  meta: {
    feature: string;
  };
}

export interface MultiError extends Prisma.PrismaClientKnownRequestError {
  code: 'P2027';
  meta: {
    errors: string;
  };
}

export interface InteractiveTransactionError extends Prisma.PrismaClientKnownRequestError {
  code: 'P2028';
  meta: {
    error: string;
  };
}

export interface QueryParameterLimitExceeded extends Prisma.PrismaClientKnownRequestError {
  code: 'P2029';
  meta: {
    message: string;
  };
}

export interface MissingFullTextSearchIndex extends Prisma.PrismaClientKnownRequestError {
  code: 'P2030';
  meta: Record<string, unknown>;
}

export interface MongoReplicaSetRequired extends Prisma.PrismaClientKnownRequestError {
  code: 'P2031';
  meta: Record<string, unknown>;
}

export interface MissingFieldsInModel extends Prisma.PrismaClientKnownRequestError {
  code: 'P2032';
  meta: {
    field: string;
    expected_type: string;
    found: string;
  };
}

export interface ValueFitError extends Prisma.PrismaClientKnownRequestError {
  code: 'P2033';
  meta: {
    details: string;
  };
}

export type PrismaErrors =
  | InputValueTooLong
  | RecordNotFound
  | UniqueKeyViolation
  | ForeignKeyViolation
  | ConstraintViolation
  | StoredValueIsInvalid
  | TypeMismatch
  | TypeMismatchInvalidCustomType
  | QueryParsingFailed
  | QueryValidationFailed
  | RawQueryFailed
  | NullConstraintViolation
  | MissingRequiredValue
  | MissingRequiredArgument
  | RelationViolation
  | RelatedRecordNotFound
  | InterpretationError
  | RecordsNotConnected
  | ConnectedRecordsNotFound
  | InputError
  | ValueOutOfRange
  | TableDoesNotExist
  | ColumnDoesNotExist
  | InconsistentColumnData
  | PoolTimeout
  | RecordRequiredButNotFound
  | UnsupportedFeature
  | MultiError
  | InteractiveTransactionError
  | QueryParameterLimitExceeded
  | MissingFullTextSearchIndex
  | MongoReplicaSetRequired
  | MissingFieldsInModel
  | ValueFitError;

export enum PrismaErrorCode {
  InputValueTooLong = 'P2000',
  RecordNotFound = 'P2001',
  UniqueKeyViolation = 'P2002',
  ForeignKeyViolation = 'P2003',
  ConstraintViolation = 'P2004',
  StoredValueIsInvalid = 'P2005',
  TypeMismatch = 'P2006',
  TypeMismatchInvalidCustomType = 'P2007',
  QueryParsingFailed = 'P2008',
  QueryValidationFailed = 'P2009',
  RawQueryFailed = 'P2010',
  NullConstraintViolation = 'P2011',
  MissingRequiredValue = 'P2012',
  MissingRequiredArgument = 'P2013',
  RelationViolation = 'P2014',
  RelatedRecordNotFound = 'P2015',
  InterpretationError = 'P2016',
  RecordsNotConnected = 'P2017',
  ConnectedRecordsNotFound = 'P2018',
  InputError = 'P2019',
  ValueOutOfRange = 'P2020',
  TableDoesNotExist = 'P2021',
  ColumnDoesNotExist = 'P2022',
  InconsistentColumnData = 'P2023',
  PoolTimeout = 'P2024',
  RecordRequiredButNotFound = 'P2025',
  UnsupportedFeature = 'P2026',
  MultiError = 'P2027',
  InteractiveTransactionError = 'P2028',
  QueryParameterLimitExceeded = 'P2029',
  MissingFullTextSearchIndex = 'P2030',
  MongoReplicaSetRequired = 'P2031',
  MissingFieldsInModel = 'P2032',
  ValueFitError = 'P2033',
}
