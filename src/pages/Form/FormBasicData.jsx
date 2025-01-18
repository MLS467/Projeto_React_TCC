import React, { useState } from 'react';
import BtnGlobal from '../../components/ButtonGlobal/BtnGlobal';
import InputLogin from '../../components/InputLogin/InputLogin';
import FormGlobal from '../../components/FormGlobal/FormGlobal';
import FormSectionGlobal from '../../components/FormGlobal/FormSectionGlobal';
import FormRowGlobal from '../../components/FormGlobal/FormRowGlobal';
import { ButtonRow } from '../../components/FormGlobal/Form.style';
import useRequest from "../../Hook/useRequest";
import { toast } from 'react-toastify';


const FormBasicData = () => {

    const [formData, setFormData] = useState({
        city: '',
        neighborhood: '',
        street: '',
        name: '',
        birth: '',
        cpf: '',
        role: "patient"
    });


    const { api } = useRequest();


    const handlePatient = async (data) => {
        const endpointPatient = import.meta.env.VITE_API_USER_ENDPOINT;
        try {
            await api.post(endpointPatient, data);
            toast.success("Paciente cadastrado com sucesso!");
        } catch (err) {
            toast.error("Erro ao cadastrar paciente, tente novamente!");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        handlePatient(formData);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleCep = async () => {
        const cep = formData.cep;
        const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response?.data) {
            setFormData({ ...formData, city: response?.data?.localidade, neighborhood: response?.data?.bairro, street: response?.data?.logradouro });
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <FormGlobal>
                <h1>Formulário de primeiro atendimento</h1>

                {/* Dados Pessoais */}
                <FormSectionGlobal legends="Dados Pessoais">
                    <FormRowGlobal>
                        <InputLogin
                            size="xxl"
                            handleChange={handleChange}
                            type="text"
                            required
                            name="name"
                            placeholder="Nome Completo"
                        />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <span>Data Nascimento:</span>
                            <InputLogin
                                size="m"
                                handleChange={handleChange}
                                type="date"
                                required
                                name="birth"
                            />
                        </div>
                        <InputLogin
                            size="l"
                            handleChange={handleChange}
                            type="text"
                            required
                            name="cpf"
                            placeholder="CPF"
                        />
                        <InputLogin
                            size="xs"
                            handleChange={handleChange}
                            type="text"
                            name="sex"
                            placeholder="Sexo"
                        />
                        <InputLogin
                            size="l"
                            handleChange={handleChange}
                            type="text"
                            required
                            name="allergy"
                            placeholder="Alergia(s)"
                        />
                    </FormRowGlobal>
                </FormSectionGlobal>

                {/* Contato */}
                <FormSectionGlobal legends="Contato">
                    <FormRowGlobal>
                        <InputLogin
                            size="xxl"
                            handleChange={handleChange}
                            type="email"
                            required
                            name="email"
                            placeholder="E-mail"
                        />
                        <InputLogin
                            size="l"
                            handleChange={handleChange}
                            type="tel"
                            required
                            name="phone"
                            placeholder="Telefone"
                        />
                        <InputLogin
                            size="l"
                            handleChange={handleChange}
                            type="tel"
                            required
                            name="emergency_contact"
                            placeholder="Telefone de Emergência"
                        />
                    </FormRowGlobal>
                </FormSectionGlobal>

                {/* Endereço */}
                <FormSectionGlobal legends="Endereço">
                    <FormRowGlobal>
                        <InputLogin
                            size="xxl"
                            onBlur={handleCep}
                            handleChange={handleChange}
                            type="text"
                            required
                            name="cep"
                            placeholder="CEP"
                        />
                        <InputLogin
                            size="l"
                            handleChange={handleChange}
                            type="text"
                            required
                            name="city"
                            value={formData.city}
                            placeholder="Cidade"
                        />
                        <InputLogin
                            size="l"
                            handleChange={handleChange}
                            type="text"
                            name="neighborhood"
                            value={formData.neighborhood}
                            placeholder="Bairro"
                        />
                        <InputLogin
                            size="xxl"
                            handleChange={handleChange}
                            type="text"
                            name="street"
                            value={formData.street}
                            placeholder="Rua"
                        />
                        <InputLogin
                            size="s"
                            handleChange={handleChange}
                            type="text"
                            name="block"
                            placeholder="Bloco"
                        />
                        <InputLogin
                            size="s"
                            handleChange={handleChange}
                            type="text"
                            name="apartment"
                            placeholder="Apartamento"
                        />
                    </FormRowGlobal>
                </FormSectionGlobal>

                {/* Dados do Responsável */}
                <FormSectionGlobal legends="Dados do Responsável">
                    <FormRowGlobal>
                        <InputLogin
                            size="xxl"
                            type="text"
                            name="responsible_name"
                            placeholder="Nome do Responsável"
                        />
                        <InputLogin
                            size="l"
                            type="tel"
                            name="responsible_contact"
                            placeholder="Telefone do Responsável"
                        />
                        <InputLogin
                            size="xl"
                            type="text"
                            name="kinship"
                            placeholder="Parentesco"
                        />
                    </FormRowGlobal>
                </FormSectionGlobal>

                {/* Botões */}
                <ButtonRow>
                    <BtnGlobal
                        size="l"
                        type="submit"
                        btnBgColor="#1e8bcc"
                        btnColor="#fff"
                        text="Enviar"
                    />
                    <BtnGlobal
                        size="l"
                        btnBgColor="#5ce4d4"
                        btnColor="#fff"
                        text="Cancelar"
                    />
                </ButtonRow>
            </FormGlobal>
        </form>


    );
};


export default FormBasicData;
