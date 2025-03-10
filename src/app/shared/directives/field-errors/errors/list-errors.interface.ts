interface ListErrors {
  required: () => string;
  min: ({min}: any) => string;
  max: ({max}: any) => string;
  email: () => string;
  minlength: ({actualLength, requiredLength}: any) => string;
  maxlength: ({requiredLength, actualLength}: any) => string;
  equalLength: ({requiredLength, actualLength}: any) => string,
  confirmPassword: () => string,
  rangeLength: ({minLength, maxLength, actualLength}: any) => string,
  equalToLengths: ({lengths, actualLength}: any) => string
  emails: () => string,
}

export const ListErrors: ListErrors = {
  required: () => 'El campo es requerido',
  min: ({min}): string => `Valor mínimo ${min}`,
  max: ({max}): string => `Valor máximo ${max}`,
  email: (): string => 'Este correo no es válido',
  minlength: ({
                requiredLength,
                actualLength
              }): string => `Mínimo <strong>${requiredLength}</strong> caracteres, actual <strong>${actualLength}</strong>`,
  maxlength: ({
                requiredLength,
                actualLength
              }): string => `Máximo <strong>${requiredLength}</strong> caracteres, actual <strong>${actualLength}</strong>`,
  equalLength: ({
                  requiredLength,
                  actualLength
                }): string => `El tamaño debe ser igual a <strong>${requiredLength}</strong> caracteres, actual <strong>${actualLength}</strong>`,
  confirmPassword: (): string => 'Las contraseñas no coinciden',
  rangeLength: ({
                  minLength,
                  maxLength,
                  actualLength
                }): string => `Debe estar entre <strong>${minLength}</strong> caracteres y <strong>${maxLength}</strong> caracteres, actual <strong>${actualLength}</strong>`,
  equalToLengths: ({
                     lengths,
                     actualLength
                   }): string => `El tamaño debe ser igual <strong>${lengths}</strong> caracteres, actual <strong>${actualLength}</strong>`,
  emails: (): string => 'Los correos no son válidos',
};
