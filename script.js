function setupCanvas(canvas) {
    const context = canvas.getContext('2d');
    let isDrawing = false;

    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        context.beginPath();
        context.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', function(e) {
        if (!isDrawing) return;
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
    });

    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
        context.closePath();
    });

    canvas.addEventListener('mouseleave', function() {
        isDrawing = false;
        context.closePath();
    });
}

window.onload = function() {
    const canvas1 = document.getElementById('podpis-canvas');
    const canvas2 = document.getElementById('podpis2-canvas');

    setupCanvas(canvas1);
    setupCanvas(canvas2);
};
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}
function scrollToElement(input){
    input.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
    });
}



document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault();
    isEmpty('zavarovanec', 'message_zavarovanec');
    isEmpty('naslov_sklenitelja', 'message_sklenitelj');
    valid_tel_stevilka('tel_stevilka', 'message_tel');
    valid_email('e-posta', 'message_mail');
    isEmpty('davcna_st', 'message_davcna');
    isEmpty('st_police', 'message_polica');
    isEmpty('vrsta_zavarovanja', 'message_vrsta');
    valid_datum('datum', 'message_datum');
    isEmpty('kraj_datum','message_kraj' );
    valid_datum('datum2', 'message_datum2');


    if(isEmpty('zavarovanec', 'message_zavarovanec')&&isEmpty('naslov_sklenitelja', 'message_sklenitelj')&&
    valid_tel_stevilka('tel_stevilka', 'message_tel')&&valid_email('e-posta', 'message_mail')&&
    isEmpty('davcna_st', 'message_davcna')&&isEmpty('st_police', 'message_polica')&&
    isEmpty('vrsta_zavarovanja', 'message_vrsta')&&valid_datum('datum', 'message_datum')&&
    isEmpty('kraj_datum','message_kraj' )&&valid_datum('datum2', 'message_datum2')){
        Swal.fire({
        title: "Zahtevek vspešno oddan!",
        icon: "success",
        customClass:{
            confirmButton: 'ok_button'
        }
      });
    }
});

function isEmpty(input, message){
    if(document.getElementById(input).value.trim() === ""){
        document.getElementById(input).classList.add('invalid');
        document.getElementById(message).textContent = 'To polje ne sme biti prazno';
        scrollToElement(document.getElementById(input));
        return false;
    }
    else{
        document.getElementById(input).classList.remove('invalid');
        document.getElementById(message).textContent = '';
        return true;
    }
}
function valid_tel_stevilka(input, message){
    if(document.getElementById(input).value.trim().length===0){
        document.getElementById(message).textContent = 'To polje ne sme biti prazno';
        document.getElementById(input).classList.add('invalid');
        scrollToElement(document.getElementById(input));
        return false;
        
    }
    else if(document.getElementById(input).value.trim().length<9 && document.getElementById(input).value.trim().length>0){
        document.getElementById(input).classList.add('invalid');
        document.getElementById(message).textContent = 'Neveljavna telefonska stevilka';
        scrollToElement(document.getElementById(input));
        return false;
    }
    else{
        document.getElementById(input).classList.remove('invalid');
        document.getElementById(message).textContent = '';
        return true;
    }
}function valid_email(input, message){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(document.getElementById(input).value.trim().length===0){
        document.getElementById(message).textContent = 'To polje ne sme biti prazno';
        document.getElementById(input).classList.add('invalid');
        scrollToElement(document.getElementById(input));
        return false;
    }
    else if(!emailRegex.test(document.getElementById(input).value)){
        document.getElementById(input).classList.add('invalid');
        document.getElementById(message).textContent = 'Neveljaven e-poštni naslov';
        scrollToElement(document.getElementById(input));
        return false;
    }
    else{
        document.getElementById(input).classList.remove('invalid');
        document.getElementById(message).textContent = '';
        return true;
    }
}
function valid_datum(input, message){
    if(document.getElementById(input).value.trim().length===0){
        document.getElementById(message).textContent = 'Vnesi usterezen datum';
        document.getElementById(input).classList.add('invalid');
        scrollToElement(document.getElementById(input));
        return false; 
    }
    else{
        document.getElementById(input).classList.remove('invalid');
        document.getElementById(message).textContent = '';
        return true;
    }
}

