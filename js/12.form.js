function validForm(f) {
    console.log(f.writer.value);
    console.log(f.email.value);

    var emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,4}$/i; //이메일 정규표현식

    if (f.writer.value.trim() == '') {
        alert('작성자를 입력하세요.');
        f.writer.focus();
        return false;
    }
    if (f.email.value.trim() == '') {
        alert('이메일을 입력하세요.');
        f.email.focus();
        return false;
    }
    if (!validEmail(f.email.value.trim())) {
        alert('이메일 형식이 올바르지 않습니다.');
        f.email.focus();
        return false;
    }
    return true;
}
