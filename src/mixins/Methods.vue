<script>
import moment from "moment";
import store from "../store";

export default {
  methods: {
    dateSubtract30Days() {
      return moment().subtract(30, "days").format("YYYY-MM-DD");
    },
    dateNowFormat(format) {
      return moment().format(format);
    },
    dateTimeTransform(date, format) {
      return moment(date).format(format);
    },
    dateISOFormat(date, format) {
      return moment(date, format).toISOString();
    },
    dateFormat(date) {
      return moment(date).format("DD/MM/YYYY");
    },

    dateTimeFormat(date) {
      return moment(date).format("DD/MM/YYYY HH:mm:ss");
    },

    dateEnFormat(date, format) {
      return moment(date, format).format("YYYY-MM-DD");
    },
    pontoPorVirgula(string) {
      return string.replace(".", ",");
    },
    byteToKByte(bytes, fixed) {
      return this.pontoPorVirgula((bytes / 1000).toFixed(fixed) + ' KB');
    },
    byteToMByte(bytes, fixed) {
      return this.pontoPorVirgula((bytes / 1000000).toFixed(fixed) + ' MB');
    },
    byteToGByte(bytes, fixed) {
      return this.pontoPorVirgula((bytes / 1000000000).toFixed(fixed) + ' GB');
    },
    byteFormat(bytes, format) {
      switch (format) {
        case 'KB':
          return this.byteToKByte(bytes, 2);
        case 'MB':
          return this.byteToMByte(bytes, 2);
        case 'GB':
          return this.byteToGByte(bytes, 2);
      }
    },
    openMessageModal(styleMessage, title, message) {
      const msg = {
        show: true,
        styleMessage: styleMessage,
        title: title,
        message: message,
      };
      if (title === undefined && message === undefined) {
        msg.title = "Ocorreu um erro!";
        msg.message =
            "Verifique a sua conexão com a internet e tente novamente mais tarde.";
      } else if (
          (message === undefined || message === null) &&
          title !== undefined
      ) {
        msg.title = "Atenção !";
        msg.message = title;
      }
      store.commit("CHANGE_MESSAGE_MODAL", msg);
    },
    openMessageSnackbar(message) {
      store.dispatch("action_changeMessageSnackBar", message);
    },
    convertStringFilter(value) {
      return value && value.length > 0 ? value : undefined;
    },
    convertArrayObjectFilter(object, key) {
      return object && object[key] && object[key] !== null && object[key] !== ""
          ? object[key]
          : null;
    },
    convertArrayObjectFilterBoolean(object, key) {
      return object && (object[key] !== undefined) && (object[key] !== null) && object[key] !== ""
          ? object[key]
          : null;
    },
    maskInputMoney(value) {
      return (value * 1).toFixed(2) / 100;
    },
    money2(value) {
      return (value * 1)
          .toFixed(2)
          .replace(".", ",")
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    moneyInput2MoneyFloat(value) {
      return parseFloat(value
          .replace(".", "")
          .replace(",", ".")
          .replace("R$ ", ""))
    },
    removePrefixMoney(value) {
      return value.toString().split("R$ ").join("");
    },
    stringToDecimal(string) {
      if (!string) {
        return null;
      }
      let value = string
          .toString()
          .split(".")
          .join("")
          .split(",")
          .join(".")
          .split("R$ ")
          .join("")
          .split(" ")
          .join("");
      return parseFloat(value);
    },
    removeMaskMoney(string) {
      if (!string) {
        return null;
      }
      let value = string
          .toString()
          .split(".")
          .join("")
          .split(",")
          .join("")
          .split("R$ ")
          .join("")
          .split(" ")
          .join("");
      return parseInt(value);
    },
    //retorna o tamanho da coluna de acordo com o tamanho do array e o index
    returnColByLength(index, length){
      if(length === 1) return 12;
      if((length % 2) === 0) return 6;
      if((length - 1) === index) return 12;
      return 6;
    },
    removeMaskCharacters(string) {
      if (!string) {
        return null;
      }
      return string
          .toString()
          .split("/")
          .join("")
          .split("(")
          .join("")
          .split(")")
          .join("")
          .split(".")
          .join("")
          .split(",")
          .join("")
          .split("R$ ")
          .join("")
          .split(" ")
          .join("")
          .split("-")
          .join("");
    },
    removeObjectFromArray(array, key, value) {
      return array.filter((e) => e[key] !== value);
    },
    findObjectFromArray(array, key, value) {
      return array.find(e => `${e[key]}` === `${value}`);
    },
    hasAnyPermission(requiredPermissions) {
      let n = 0;
      requiredPermissions.forEach((permission) => {
        if (store.state.auth.user.permissions.includes(permission)) {
          n++;
        }
      });
      return n > 0;
    },

    downloadCsvString(url, title) {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', title)
      document.body.appendChild(link);
      link.click();
    },

    hasPermission(requiredPermissions) {
      if (!requiredPermissions) return false;
      let n = requiredPermissions.length;
      requiredPermissions.forEach((perm) => {
        if (store.state.auth.user.permissions.includes(perm)) {
          n--;
        }
      });
      return n === 0;
    },
    filterTypesTreasuryTransaction(item) {
      switch (item) {
        case "DESCARGA_TESOURARIA":
          return "Descarga";
        default:
          return item;
      }
    },
    filterTypeStatusManageCard(item) {
      switch (item) {
        case 1:
          return "Desbloqueado";
        case 2:
        case 5005:
          return "Bloqueado por Emissão";
        case 3:
        case 5000:
          return "Bloqueado por Fraude";
        case 4:
          return "Bloqueado por Senha Incorreta";
        case 5:
          return "Situação Judicical";
        case 6:
          return "Bloqueado por Roubo";
        case 7:
          return "Bloqueado por Perda";
        case 8:
          return "Cancelado/Desativado";
        case 9:
          return "Bloqueado Por Extravio";
        case 10:
          return "Bloqueado por Suspeita de Fraude";
        case 11:
          return "Bloqueado por Emissão";
        case 5001:
          return "Bloqueado por Tentativas de Acesso";
        case 5002:
          return "Bloqueado por Roubo";
        case 5004:
          return "Bloqueado por Solicitalção Judicial";
        case 6000:
          return "Desbloqueio por Contestação de Fraude";
        case 6001:
          return "Desbloqueio por Tentativas de Acesso";
        case 6002:
          return "Desbloqueio por Roubo";
        case 6003:
          return "Desbloqueio por Perda";
        case 6004:
          return "Desbloqueio por Solicitalção Judicial";
        case 6005:
          return "Desbloqueio por Emissão";
        default:
          return item;
      }
    },
    returnSVGCardFlag(name) {
      if (name) {
        let cleanName = name.toLowerCase().split(" ").join("");
        return require(`@/assets/flag-cards/${cleanName}.svg`);
      }
      return "";
    },
    statusCadastroCliente() {
      return [
        {value: 1, key: "Pré cadastro"},
        {value: 2, key: "Cadastro completo"},
        {value: 3, key: "Em análise KYC"},
        {value: 5, key: "Negado por KYC"},
        {value: 7, key: "Em análise CAF"},
        {value: 8, key: "Negado por CAF"},
        {value: 9, key: "Aguardando assinatura"},
        {value: 10, key: "Aguardando solicitacao link"},
        {value: 11, key: "Aguardando confirmação de documentos"},
      ]
    },
    arrayBrStates() {
      return [
        {key: "AC", value: "Acre"},
        {key: "AL", value: "Alagoas"},
        {key: "AP", value: "Amapá"},
        {key: "AM", value: "Amazonas"},
        {key: "BA", value: "Bahia"},
        {key: "CE", value: "Ceará"},
        {key: "DF", value: "Distrito Federal"},
        {key: "ES", value: "Espírito Santo"},
        {key: "GO", value: "Goiás"},
        {key: "MA", value: "Maranhão"},
        {key: "MT", value: "Mato Grosso"},
        {key: "MS", value: "Mato Grosso do Sul"},
        {key: "MG", value: "Minas Gerais"},
        {key: "PA", value: "Pará"},
        {key: "PB", value: "Paraíba"},
        {key: "PR", value: "Paraná"},
        {key: "PE", value: "Pernambuco"},
        {key: "PI", value: "Piauí"},
        {key: "RJ", value: "Rio de Janeiro"},
        {key: "RN", value: "Rio Grande do Norte"},
        {key: "RS", value: "Rio Grande do Sul"},
        {key: "RO", value: "Rondônia"},
        {key: "RR", value: "Roraima"},
        {key: "SC", value: "Santa Catarina"},
        {key: "SP", value: "São Paulo"},
        {key: "SE", value: "Sergipe"},
        {key: "TO", value: "Tocantins"},
      ];
    },
    arrayEmittingOrgan() {
      return [
        {value: 'SSP', label: 'SSP - Secretaria de Segurança Pública do Estado'},
        {value: 'RCPN', label: 'RCPN - Cartório Civil'},
        {value: 'PF', label: 'PF - Polícia Federal'},
        {value: 'DETRAN', label: 'DETRAN'},
        {value: 'ABNC', label: 'ABNC - Academia Brasileira de Neurocirurgia'},
        {
          value: 'CGPI/DUREX/DPF',
          label:
              'CGPI/DUREX/DPF - Coordenação Geral de Polícia de Imigração da Polícia Federal',
        },
        {
          value: 'CGPI',
          label: 'CGPI - Coordenação-Geral de Privilégios e Imunidades',
        },
        {
          value: 'CGPMAF',
          label:
              'CGPMAF - Coordenadoria Geral de Polícia Marítima, Aeronáutica e de Fronteiras',
        },
        {value: 'CNIG', label: 'CNIG - Conselho Nacional de Imigração'},
        {value: 'CNT', label: 'CNT - Confederação Nacional de Transporte'},
        {value: 'COREN', label: 'COREN - Conselho Regional de Enfermagem'},
        {value: 'CORECON', label: 'CORECON - Conselho Regional de Economia'},
        {value: 'CRA', label: 'CRA - Conselho Regional de Administração'},
        {
          value: 'CRAS',
          label: 'CRAS - Centro de Referência de Assistência Social',
        },
        {value: 'CRB', label: 'CRB - Conselho Regional de Biblioteconomia'},
        {value: 'CRC', label: 'CRC - Conselho Regional de Contabilidade'},
        {value: 'CRE', label: 'CRE - Conselho Regional de Estatística'},
        {
          value: 'CREA',
          label: 'CREA - Conselho Regional de Engenharia e Agronomia',
        },
        {
          value: 'CRECI',
          label: 'CRECI - Conselho Regional de Corretores de Imóveis',
        },
        {
          value: 'CREFIT',
          label: 'CREFIT - Conselho Regional de Fisioterapia e Terapia Ocupacional',
        },
        {value: 'CRESS', label: 'CRESS - Conselho Regional de Serviço Social'},
        {value: 'CRF', label: 'CRF - Conselho Regional de Farmácia'},
        {value: 'CRM', label: 'CRM - Conselho Regional de Medicina'},
        {value: 'CRN', label: 'CRN - Conselho Regional de Nutrição'},
        {value: 'CRO', label: 'CRO - Conselho Regional de Odontologia'},
        {value: 'CRP', label: 'CRP - Conselho Regional de Psicologia'},
        {
          value: 'CRPRE',
          label: 'CRPRE - Conselho Regional de Profissionais de Relações Públicas',
        },
        {value: 'CRQ', label: 'CRQ - Conselho Regional de Química'},
        {
          value: 'CRRC',
          label: 'CRRC - Conselho Regional de Representantes Comerciais',
        },
        {
          value: 'CRMV',
          label: 'CRMV - Conselho Regional de Medicina Veterinária',
        },
        {value: 'CSC', label: 'CSC - Carteira Sede Carpina de Pernambuco'},
        {
          value: 'CTPS',
          label: 'CTPS - Carteira de Trabalho e Previdência Social',
        },
        {value: 'DIC', label: 'DIC - Diretoria de Identificação Civil'},
        {value: 'DIREX', label: 'DIREX - Diretoria-Executiva'},
        {
          value: 'DPMAF',
          label: 'DPMAF - Divisão de Polícia Marítima, Área e de Fronteiras',
        },
        {value: 'DPT', label: 'DPT - Departamento de Polícia Técnica Geral'},
        {value: 'DST', label: 'DST - Programa Municipal DST/Aids'},
        {value: 'FGTS', label: 'FGTS - Fundo de Garantia do Tempo de Serviço'},
        {
          value: 'FIPE',
          label: 'FIPE - Fundação Instituto de Pesquisas Econômicas',
        },
        {value: 'FLS', label: 'FLS - Fundação Lyndolpho Silva'},
        {value: 'GOVGO', label: 'GOVGO - Governo do Estado de Goiás'},
        {value: 'I CLA', label: 'I CLA - Carteira de Identidade Classista'},
        {value: 'IFP', label: 'IFP - Instituto Félix Pacheco'},
        {value: 'IGP', label: 'IGP - Instituto Geral de Perícias'},
        {
          value: 'IICCECF/RO',
          label:
              'IICCECF/RO - Instituto de Identificação Civil e Criminal Engrácia da Costa Francisco de Rondônia',
        },
        {value: 'IIMG', label: 'IIMG - Inter-institutional Monitoring Group'},
        {value: 'IML', label: 'IML - Instituto Médico-Legal'},
        {value: 'IPC', label: 'IPC - Índice de Preços ao Consumidor'},
        {value: 'IPF', label: 'IPF - Instituto Pereira Faustino'},
        {value: 'MAE', label: 'MAE - Ministério da Aeronáutica'},
        {value: 'MEX', label: 'MEX - Ministério do Exército'},
        {value: 'MMA', label: 'MMA - Ministério da Marinha'},
        {value: 'OAB', label: 'OAB - Ordem dos Advogados do Brasil'},
        {value: 'OMB', label: 'OMB - Ordens dos Músicos do Brasil'},
        {value: 'PCMG', label: 'PCMG - Polícia Civil do Estado de Minas Gerais'},
        {
          value: 'PMMG',
          label: 'PMMG - Polícia Militar do Estado de Minas Gerais',
        },
        {value: 'POM', label: 'POM - Polícia Militar'},
        {value: 'SDS', label: 'SDS - Secretaria de Defesa Social (Pernambuco)'},
        {
          value: 'SNJ',
          label:
              'SNJ - Secretaria Nacional de Justiça / Departamento de Estrangeiros',
        },
        {value: 'SECC', label: 'SECC - Secretaria de Estado da Casa Civil'},
        {
          value: 'SEJUSP',
          label:
              'SEJUSP - Secretaria de Estado de Justiça e Segurança Pública – Mato Grosso',
        },
        {value: 'EST', label: 'EST - Carteira de Estrangeiro'},
        {
          value: 'SESP',
          label: 'SESP - Secretaria de Estado da Segurança Pública do Paraná',
        },
        {value: 'SJS', label: 'SJS - Secretaria da Justiça e Segurança'},
        {
          value: 'SJTC',
          label: 'SJTC - Secretaria da Justiça do Trabalho e Cidadania',
        },
        {
          value: 'SJTS',
          label: 'SJTS - Secretaria da Justiça do Trabalho e Segurança',
        },
        {value: 'SPTC', label: 'SPTC - Secretaria de Polícia Técnico-Científica'},
      ];
    },
    validateDate(date) {
      if (date.length === 10) {
        let day = date[0] + date[1];
        let month = date[3] + date[4];
        let year = date[6] + date[7] + date[8] + date[9];
        return (
            day >= "01" &&
            day <= "31" &&
            month >= "01" &&
            month <= "12" &&
            year >= "1900" &&
            year <= "2070"
        );
      }
      return false;
    },
    validateCpf(value) {
      if (value.length === 14) {
        value = value
            .split(".")
            .join("")
            .split("-")
            .join("")
            .split("/")
            .join("");
        var Soma;
        var Resto;
        var i;
        Soma = 0;
        var strCPF = value;
        if (
            strCPF == "00000000000" ||
            strCPF == "11111111111" ||
            strCPF == "22222222222" ||
            strCPF == "33333333333" ||
            strCPF == "44444444444" ||
            strCPF == "55555555555" ||
            strCPF == "66666666666" ||
            strCPF == "77777777777" ||
            strCPF == "88888888888" ||
            strCPF == "99999999999"
        )
          return false;
        for (i = 1; i <= 9; i++)
          Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        if (Resto == 10 || Resto == 11) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;
        Soma = 0;
        for (i = 1; i <= 10; i++)
          Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if (Resto == 10 || Resto == 11) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
      }
      return false;
    },
    validateCnpj(s) {
      let cnpj = s.replace(/[^\d]+/g, "");

      if (
          !cnpj ||
          cnpj.length != 14 ||
          cnpj == "00000000000000" ||
          cnpj == "11111111111111" ||
          cnpj == "22222222222222" ||
          cnpj == "33333333333333" ||
          cnpj == "44444444444444" ||
          cnpj == "55555555555555" ||
          cnpj == "66666666666666" ||
          cnpj == "77777777777777" ||
          cnpj == "88888888888888" ||
          cnpj == "99999999999999"
      )
        return false;
      var tamanho = cnpj.length - 2;
      var numeros = cnpj.substring(0, tamanho);
      var digitos = cnpj.substring(tamanho);
      var soma = 0;
      var pos = tamanho - 7;
      for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return false;
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(1)) return false;
      return true;
    },
    cpfMask(value) {
      if (value && value.length === 11) {
        return (
            value.substring(0, 3) +
            "." +
            value.substring(3, 6) +
            "." +
            value.substring(6, 9) +
            "-" +
            value.substring(9, 11)
        );
      }
      return "---";
    },
    cnpjMask(value) {
      if (value && value.length === 14) {
        return (
            value.substring(0, 2) +
            "." +
            value.substring(2, 5) +
            "." +
            value.substring(5, 8) +
            "/" +
            value.substring(8, 12) +
            "-" +
            value.substring(12, 14)
        );
      }
      return "---";
    },
    phoneMask(v) {
      return v.replace(/(\d)(\d{4})$/, "$1-$2");
    },
  },
};
</script>

