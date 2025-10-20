var app  = {

    age : null,
    sallary : 0, 
    loan :  0,
    expenses : 0,

    init : function (age,sallary,loan,expenses) {
        app.age = age;
        app.sallary = sallary;
        app.loan = loan;
        app.expenses = expenses;
    },

    etfNames : {
        XLK: 'Technology ',
        XLV: 'Health ',
        XLE: 'Energy',
        XLF: 'Financial',
        XLI: 'Industrial',
        XLB: 'Materials',
        XLP: 'Consumer Staples',
        XLY: 'Consumer Discretionary',
        XLU: 'Utilities',
        XLC: 'Communication Services',
        XLRE: 'Real Estate',
        MGC: 'Mega Cap', 
        VV:'Large Cap',
        VO:'Mid Cap',
        VB: 'Small Cap',
        BND: 'Bond Market ETF'
    },

    equityAlloc : {
        less30 : {
                XLK: 25, 
                XLV: 20,
                XLE: 2,
                XLF: 10,
                XLI: 5,
                XLB: 1,
                XLP: 1,
                XLY: 5,
                XLU: 1,
                XLC: 20,
                XLRE: 1,
                MGC: 10, 
                VV: 25,
                VO:30,
                VB: 25
        },
        middle_50 :                 
        {  
                XLK: 20, 
                XLV: 15,
                XLE: 5,
                XLF: 15,
                XLI: 10,
                XLB: 1,
                XLP: 8,
                XLY: 8,
                XLU: 1,
                XLC: 15,
                XLRE: 2,
                MGC:15, 
                VV:25,
                VO:30,
                VB: 20
             },
        others :  {  
                XLK: 25, 
                XLV: 20,
                XLE: 2,
                XLF: 10,
                XLI: 5,
                XLB: 1,
                XLP: 1,
                XLY: 5,
                XLU: 1,
                XLC: 20,
                XLRE: 1,
                MGC: 10, 
                VV: 25,
                VO:30,
                VB: 25
            }
        

    },
     
            

    equityPct : function () {
        return 110-app.age;
    },

    bond : function () {
        return 100 - app.equityPct()
    },

    InvestingAmount : function () {
        return  app.sallary - app.loan - app.expenses;
    },

    caluculate   : function () {
        if(app.age < 30) {
            sectionPercent = app.equityAlloc.less30;
        }else if (app.age >= 30 && app.age <=50) {
            sectionPercent = app.equityAlloc.middle_50;
        } else {
            sectionPercent = app.equityAlloc.other;
        }

        PercentsObject = {};


        Object.keys(sectionPercent).forEach ( key => {
            PercentsObject[key] = (sectionPercent[key] * app.equityPct()) / 100;
        })

        InvestingAmount =  app.InvestingAmount();


        InvestingAmountObject = {};

        Object.keys(sectionPercent).forEach ( key => {
            InvestingAmountObject[key] = InvestingAmount / 100 * PercentsObject[key];
        });
        data = {};
        Object.keys(sectionPercent).forEach ( key => { 
            data[key] = {
                etf_name : app.etfNames[key],
                percent : PercentsObject[key],
                InvestingAmount : InvestingAmountObject[key]
            }
        })

        return data;
         
        

    }


}