export const french = {
  'any.custom': '"{{#label}}" failed custom validation because {{#error.message}}',
  'any.default': '"{{#label}}" a renvoyé une erreur en éxecutant la fonction par défaut',
  'any.invalid': '"{{#label}}" contient une valeur invalide',
  'any.only': '"{{#label}}" doit être {{valids}}',
  'any.unknown': '"{{#label}}" n\'est pas autorisé',
  'any.empty': '"{{#label}}" ne doit pas être vide',
  'any.required': '"{{#label}}" est requis',
  'alternatives.base': "ne correspond pas à l'une des alternatives autorisées",
  'alternatives.child': 'non implémenté',
  'array.base': 'doit être un tableau',
  'array.includes': "position {{pos}} ne correspond pas à l'un des types autorisés",
  'array.includesSingle': 'valeur solitaire "{{!label}}" ne correspond pas à l\'un des types autorisés',
  'array.includesOne': 'position {{pos}} échoue car {{reason}}',
  'array.includesOneSingle': 'valeur solitaire "{{!label}}" échoue car "{{reason}}"',
  'array.includesRequiredUnknowns': 'ne contient pas {{unknownMisses}} valeur(s) requise(s)',
  'array.includesRequiredKnowns': 'ne contient pas {{knownMisses}}',
  'array.includesRequiredBoth': 'ne contient pas {{knownMisses}} et {{unknownMisses}} autres valeur(s) requise(s)',
  'array.excludes': 'position {{pos}} contient une valeur exclue',
  'array.excludesSingle': 'valeur solitaire "{{!label}}" contient une valeur exclue',
  'array.min': 'doit contenir au moins {{limit}} objet(s)',
  'array.max': 'doit contenir au maximum {{limit}} objet(s)',
  'array.length': 'doit contenir {{limit}} objet(s)',
  'array.ordered': 'position {{pos}} échoue car {{reason}}',
  'array.orderedLength': 'position {{pos}} échoue car le tableau doit contenir au plus {{limit}} objet(s)',
  'array.ref': 'référence "{{ref}}" qui n\'est pas un entier positif',
  'array.sparse': 'ne doit pas contenir de valeurs nulles',
  'array.unique': 'position {{pos}} contient une valeur dupliquée',
  'array.contains': 'ne contient pas "{{contains}}"',
  'boolean.base': 'doit être un booléen',
  'binary.base': 'doit être une chaîne de caractères ou un tampon',
  'binary.min': 'doit avoir au minimum {{limit}} octet(s)',
  'binary.max': 'doit avoir au maximum {{limit}} octet(s)',
  'binary.length': 'doit avoir {{limit}} octet(s)',
  'date.base': 'doit être un nombre de millisecondes ou une date valide',
  'date.format': "doit être une chaîne de caractères avec l'un des formats suivant {{format}}",
  'date.strict': 'doit être une date valide',
  'date.min': '{{#label}} doit être plus grand ou égal(e) à {{:#limit}}',
  'date.max': '{{#label}} doit être plus petit ou égal(e) à {{:#limit}}',
  'date.isoDate': 'doit être une date valide au format ISO 8601',
  'date.ref': 'référence "{{ref}}" qui n\'est pas une date',
  'function.base': 'doit être une Fonction',
  'function.arity': 'doit avoir une arité de {{n}}',
  'function.minArity': 'doit avoir une arité plus grande ou égale à {{n}}',
  'function.maxArity': 'doit avoir une arité plus petite ou égale à {{n}}',
  'function.ref': 'doit être une référence Joi',
  'function.class': 'doit être une classe',
  'lazy.base': '!!schema error: lazy schema must be set',
  'lazy.schema': '!!schema error: lazy schema function must return a schema',
  'object.base': 'doit être un objet',
  'object.child': '!!propriété "{{!child}}" échoue car {{reason}}',
  'object.min': 'doit avoir au minimum {{limit}} enfant(s)',
  'object.max': 'doit avoir au maximum {{limit}} enfant(s)',
  'object.length': 'doit avoir {{limit}} enfant(s)',
  'object.allowUnknown': '!!"{{!child}}" is not allowed',
  'object.with': '!!"{{mainWithLabel}}" pair requis manquant "{{peerWithLabel}}"',
  'object.without': '!!"{{mainWithLabel}}" est en conflit avec un pair interdit "{{peerWithLabel}}"',
  'object.missing': 'doit contenir au moins une des valeurs: {{peersWithLabels}}',
  'object.xor': 'a un conflit entre des pairs exclusifs {{peersWithLabels}}',
  'object.or': 'doit contenir au moins une des valeurs: {{peersWithLabels}}',
  'object.and': 'contient {{presentWithLabels}} sans ses pairs requis {{missingWithLabels}}',
  'object.nand': '!!"{{mainWithLabel}}" ne doit pas exister simultanément avec {{peersWithLabels}}',
  'object.assert': '!!"{{ref}}" validation a échoué car "{{ref}}" a échoué à {{message}}',
  'object.rename.multiple': '{{#label}} cannot rename "{{#from}}" because multiple renames are disabled and another key was already renamed to "{{#to}}"',
  'object.rename.override': '{{#label}} cannot rename "{{#from}}" because override is disabled and target "{{#to}}" exists',
  'object.type': '{{#label}} doit être une instance de "{{type}}"',
  'object.schema': '{{#label}} doit être une instance Joi',
  'number.base': '{{#label}} doit être un nombre',
  'number.min': '{{#label}} doit être au minimum égale à {{limit}}',
  'number.max': '{{#label}} doit être au maximum égale à {{limit}}',
  'number.less': '{{#label}} doit être plus petit que {{limit}}',
  'number.greater': '{{#label}} doit être plus grand que {{limit}}',
  'number.float': '{{#label}} doit être un nombre décimal',
  'number.integer': '{{#label}} doit être un nombre entier',
  'number.negative': '{{#label}} doit être un nombre négatif',
  'number.positive': '{{#label}} doit être un nombre positif',
  'number.precision': '{{#label}} ne doit pas avoir plus de {{limit}} chiffre(s) après la virgule',
  'number.ref': '{{#label}} référence "{{ref}}" qui n\'est pas un nombre',
  'number.multiple': '{{#label}} doit être un multiple de {{#multiple}}',
  'string.base': 'doit être une chaîne de caractères',
  'string.empty': '{{#label}} ne doit pas être vide',
  'string.min': '{{#label}} doit avoir une longueur au minimum égale à {{#limit}} caractère(s)',
  'string.max': '{{#label}} doit avoir une longueur au maximul égale à {{#limit}} caractère(s)',
  'string.length': '{{#label}} doit avoir une longueur égale à {{#limit}} caractère(s)',
  'string.alphanum': '{{#label}} ne doit contenir que des caractères alpha-numérique',
  'string.token': '{{#label}} ne doit contenir que des caractères alpha-numérique et des tiret bas',
  'string.pattern.base': '{{#label}} avec la valeur "{{!value}}" ne correspond pas au modèle: {{pattern}}',
  'string.pattern.name': '{{#label}} avec la valeur "{{!value}}" ne correspond pas au modèle {{name}}',
  'string.pattern.invert.base': '{{#label}} avec la valeur  "{{!value}}" correspont au modèle inversé: {{pattern}}',
  'string.pattern.invert.name': '{{#label}} avec la valeur  "{{!value}}" correspont au modèle {{name}} inversé',
  'string.email': '{{#label}} doit être un email valide',
  'string.uri': '{{#label}} doit être une uri valide',
  'string.uriRelativeOnly': '{{#label}} doit être une uri relative valide',
  'string.uriCustomScheme': '{{#label}} doit être une uri relative valide correspondant au modèle {{scheme}}',
  'string.isoDate': '{{#label}} doit être une date valide au format ISO 8601 ',
  'string.guid': '{{#label}} doit être un GUID valide',
  'string.hex': '{{#label}} ne doit contenir que des caractères hexadécimaux',
  'string.base64': '{{#label}} doit être une chaîne de caractères en base64 valide',
  'string.hostname': "{{#label}} doit être un nom d'hôte valide",
  'string.normalize': '{{#label}} doit être normalisé unicode au format {{form}}',
  'string.lowercase': '{{#label}} ne doit contenir que des caractères minuscules',
  'string.uppercase': '{{#label}} ne doit contenir que des caractères majuscules',
  'string.trim': "{{#label}} ne doit pas contenir d'espace(s) inutile(s)",
  'string.creditCard': '{{#label}} doit être une carte de crédit',
  'string.ref': 'référence "{{ref}}" qui n\'est pas un nombre',
  'string.ip': '{{#label}} doit être une adresse IP valide avec un CIDR {{cidr}}',
  'string.ipVersion': '{{#label}} doit être une adresse IP valide avec une des version suivantes: {{version}} et un CIDR {{cidr}}',
  'string.phoneNumber': '{{#label}} est invalide'
}
