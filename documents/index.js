module.exports = ({
  values: {
    currentUser,
    id,
    client: {
      label,
      companyName,
      nip,
      address,
      phone,
      email,
      discount: clientDiscount,
    },
    dateOfRent,
    dateOfReturn,
    isFinished,
    products,
    price,
    brutto,
    netto,
    advance,
    vat,
    discount,
    td,
    rentDuration,
  },
}) => {
  const nettoSum =
    products
      .map((product) => product.qty * product.netto)
      .reduce((a, b) => a + b) * rentDuration;
  const bruttoSum =
    products
      .map((product) => product.qty * product.brutto)
      .reduce((a, b) => a + b) * rentDuration;
  const vatSum =
    products
      .map(
        (product) =>
          (product.qty * product.brutto * parseInt(product.vat, 10)) / 100
      )
      .reduce((a, b) => a + b) * rentDuration;

  const productSum = products.map(
    (product) => `
        <tr>
            <td>${product.vat}</td>
            <td>${(rentDuration * product.qty * product.netto).toFixed(2)}</td>
            <td>${(
              rentDuration *
              (parseInt(product.vat, 10) / 100) *
              product.brutto *
              product.qty
            ).toFixed(2)}</td>
            <td>${(rentDuration * product.qty * product.brutto).toFixed(2)}</td>
        </tr>`
  );

  const productList = products
    .map(
      (product, nr) =>
        `<tr class="item">
            <td>${nr + 1}</td>

            <td colspan="12">${product.productName}</td>

            <td colspan="1">${product.unit}</td>

            <td colspan="2">${product.qty}</td>

            <td colspan="2">${product.netto.toFixed(2)}</td>

            <td colspan="2">${product.vat}%</td>

            <td colspan="2">${(product.qty * product.netto).toFixed(2)}</td>

            <td colspan="2">${(product.qty * product.brutto).toFixed(2)}</td>
          </tr>`
    )
    .reduce((a, b) => a + b);
  return `
  <!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Faktura VAT </title>

    <style>
    .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 14px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
    }

    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
        border-collapse: collapse
    }

    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
    }

    .invoice-box table tr td:nth-child(2) {
        text-align: right;
    }

    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }

    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }

    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }

    .invoice-box table tr.information table td span {
        font-weight: bold
    }

    .invoice-box table tr.heading td {
        /* background: #eee; */
        border: 1px solid #000;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
    }

    .invoice-box table tr.details td {
        padding-bottom: 20px;

    }

    .invoice-box table tr.item td {
        border: 1px solid #000;
        text-align: right;
    }

    .invoice-box table tr.item td:nth-child(2){
        text-align: left;
    }

    .invoice-box table tr.item td:nth-child(3){
        text-align: center;
    }

    .invoice-box table tr.item.last td {
        /* border-bottom: none; */
    }

    .invoice-box table tr.total td:last-child {
        border-top: 1px solid #000;
        font-weight: bold;
    }

    .invoice-box table tr.total td {
        text-align: right;
    }

    table.footer {
        margin-top: 15px;
    }

    table.footer tr:first-child td {
        text-align: center;
    }
    table.footer tr:last-child td {
        text-align: center;
        font-size: 11px;
    }

    .invoice-box table.left tr td:nth-child(2) {
        text-align: center;
    }

    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }

        table.footer tr td {
        width: 100%;
        display: inline-block;
        text-align: center;
        }

        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }

    .under {
        margin-top: 25px;
    }

    .left {
        width: 50%;
        text-align: center;
    }

    .left * {
        border: 1px solid black;
        text-align: center;
    }


    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }

    .rtl table {
        text-align: right;
    }

    .rtl table tr td:nth-child(2) {
        text-align: left;
    }
    </style>
</head>

<body>
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="24">
                    <table>
                        <tr>
                            <td class="title">
                                <p>Rentapp</p>
                            </td>

                            <td>
                                Faktura nr FV: ..............<br>
                                Data wystawienia: ${td}<br>
                                Data sprzeda??y: ................
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr class="information">
                <td colspan="24">
                    <table>
                        <tr>
                            <td>
                                <span>Sprzedawca</span><br>
                                ${currentUser.companyName}<br>
                                ${currentUser.name} ${currentUser.surname}<br>
                                ${currentUser.address.street}<br>
                                ${currentUser.address.postalCode} ${
    currentUser.address.city
  }<br>
                                NIP: ${currentUser.nip}<br>
                                Tel: ${currentUser.phone}<br>
                                Email: ${currentUser.email}
                            </td>

                            <td>
                                <span>Nabywca</span><br>
                                ${companyName}<br >
                                ${label}<br>
                                ${address.street}<br>
                                ${address.postalCode} ${address.city}<br>
                                NIP: ${nip}<br>
                                Tel: ${phone}<br>
                                Email: ${email}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <!-- <tr class="heading">
                <td colspan="20">
                    Metoda p??atno??ci
                </td>

                <td colspan="4">
                    Check
                </td>
            </tr> -->
<!--
            <tr class="details">
                <td colspan="20">
                    Check
                </td>

                <td colspan="4">
                    1000
                </td>
            </tr> -->

            <tr class="heading">
                <td>
                    LP
                </td>

                <td colspan="12">
                    Nazwa
                </td>

                <td colspan="1">
                    Jedn
                </td>

                <td colspan="2">
                    Ilo????
                </td>

                <td colspan="2">
                    Cena netto
                </td>

                <td colspan="2">
                    Stawka
                </td>

                <td colspan="2">
                    Warto???? netto
                </td>

                <td colspan="2">
                    Warto???? brutto
                </td>
            </tr>

            <!--
            <tr class="item">
              <td>1</td>

              <td colspan="12"></td>

              <td colspan="1"></td>

              <td colspan="2"></td>

              <td colspan="2"></td>

              <td colspan="2"></td>

              <td colspan="2"></td>

              <td colspan="2"></td>
            </tr>
            -->

            ${productList}

            <!-- <tr class="total">
                <td colspan="20">
                </td>

                <td colspan="4">
                   Zap??acono: $385.00
                </td>
            </tr>

            <tr class="total">
                <td colspan="20">
                </td>

                <td colspan="4">
                   Do zap??aty: $385.00
                </td>
            </tr> -->

            <!-- <tr class="total">
                <td colspan="24">
                    <table>
                        <tr>
                            <td>Stawka VAT</td>
                            <td>Warto???? netto</td>
                            <td>Kwota VAT</td>
                            <td>Warto???? brutto</td>
                            <td colspan="2">Zap??acono: </td>
                            <td colspan="2">
                                $385.00
                             </td>
                        </tr>
                    </table>
                </td>
            </tr> -->

            <table class="under">
                <td colspan="4" class="left">
                    <table class="left">
                        <tr>
                            <td>Stawka VAT</td>
                            <td >Warto???? netto</td>
                            <td>Kwota VAT</td>
                            <td>Warto???? brutto</td>

                        </tr>

                        ${productSum.reduce((a, b) => a + b)}

                        <tr>
                            <td>Razem: </td>
                            <td>${nettoSum.toFixed(2)}</td>
                            <td>${vatSum.toFixed(2)}</td>
                            <td>${bruttoSum.toFixed(2)}</td>
                        </tr>
                    </table>
                </td>
                <td>
                    <table class="right">
                        <tr class="total">
                            <td>
                                D??ugo???? najmu:
                            </td>
                            <td>
                                ${rentDuration} dni
                             </td>
                        </tr>
                        <tr class="total">
                            <td>
                                Kaucja zwrotna:
                            </td>
                            <td>
                                ${parseFloat(advance).toFixed(2)}
                             </td>
                        </tr>
                        <tr class="total">
                            <td>
                                Razem:
                            </td>
                            <td>
                                ${bruttoSum.toFixed(2)}
                             </td>
                        </tr>
                        <tr class="total">
                            <td>
                                Rabat ${clientDiscount}%
                            </td>
                            <td>
                                ${discount.toFixed(2)}
                             </td>
                        </tr>
                        <tr class="total">
                            <td>
                                Suma:
                            </td>
                            <td>
                                ${(bruttoSum - discount).toFixed(2)} z??
                             </td>
                        </tr>
                    </table>
                </td>
            </table>

        </table>
        <table class="footer">
            <tr>
                <td>..................................................</td>
                <td>..................................................</td>
            </tr>
            <tr>
                <td>imi?? i nazwisko osoby uprawnionej <br>do wystawienia faktury</p>
                <td>imi?? i nazwisko osoby uprawnionej <br>do odbioru faktury</td>
            </tr>
        </table>
    </div>
</body>
</html>
    `;
};
