   
{
  "rules": {
     // TypeScript Specific
     "member-access": true, // Requires explicit visibility declarations for class members.
     "no-any": true, // Diallows usages of any as a type declaration.
     // Functionality
     "label-position": true, // Only allows labels in sensible locations.
     "no-bitwise": true, // Disallows bitwise operators.
     "no-eval": true, // Disallows eval function invocations.
     "no-null-keyword": true, // Disallows use of the null keyword literal.
     "no-unsafe-finally": true, // Disallows control flow statements, such as return, continue, break and throws in finally blocks.
     "no-var-keyword": true, // Disallows usage of the var keyword.
     "radix": true, // Requires the radix parameter to be specified when calling parseInt.
     "triple-equals": true, // Requires === and !== in place of == and !=.
     "use-isnan": true, // Enforces use of the isNaN() function to check for NaN references instead of a comparison to the NaN constant.
     // Style
     "class-name": true, // Enforces PascalCased class and interface names. 
     "interface-name": [ true, "never-prefix" ], // Requires interface names to begin with a capital ‘I’
     "no-angle-bracket-type-assertion": true, // Requires the use of as Type for type assertions instead of <Type>.
     "one-variable-per-declaration": true, // Disallows multiple variable definitions in the same declaration statement.
     "quotemark": [ true, "single", "avoid-escape" ], // Requires double quotes for string literals.
     "semicolon": [ true, "never" ], // Enforces consistent semicolon usage at the end of every statement.
     "variable-name": [true, "ban-keywords", "check-format", "allow-leading-underscore"] // Checks variable names for various errors. Disallows the use of certain TypeScript keywords (any, Number, number, String, string, Boolean, boolean, undefined) as variable or parameter. Allows only camelCased or UPPER_CASED variable names. Allows underscores at the beginning (only has an effect if “check-format” specified).
  }
}
  
