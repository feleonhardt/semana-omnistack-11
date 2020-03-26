import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import style from './style';

export default function Casos() {
    const [casos, setCasos] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    const navigation = useNavigation();


    function navigateToDetail(caso) {
        navigation.navigate('Detail', { caso });
    }

    async function loadCasos() {
        if (loading) {
            return;
        }

        if (total > 0 && casos.length == total) {
            return;
        }

        setLoading(true);


        const response = await api.get('casos', {
            params: { page }
        });

        setCasos([...casos, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadCasos();
    }, []);


    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={style.title}>Bem-vindo!</Text>
            <Text style={style.description}>Escolha um dos casos e salve o dia.</Text>

            <FlatList
                style={style.casosList}
                data={casos}
                keyExtractor={caso => String(caso.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadCasos}
                onEndReachedThreshold={0.3}
                renderItem={({ item: caso }) => (
                    <View style={style.caso}>
                        <Text style={style.casoProperty}>ONG:</Text>
                        <Text style={style.casoValue}>{caso.name}</Text>
                        
                        <Text style={style.casoProperty}>CASO:</Text>
                        <Text style={style.casoValue}>{caso.title}</Text>
                        
                        <Text style={style.casoProperty}>VALOR:</Text>
                        <Text style={style.casoValue}>
                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.value)}
                        </Text>

                        <TouchableOpacity 
                            style={style.detailsButton}
                            onPress={() => navigateToDetail(caso)}
                        >
                            <Text style={style.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}