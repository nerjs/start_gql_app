

export const getName = w => process.env.NODE_ENV == 'production' ? '_c' : `Cuw(${w.displayName || w.name})`