import {useState} from 'react'
import arrowLogo from './assets/arrow.svg'
import './App.css'

interface IAnswer {
    code: string;
    status: string;
    response: string;
}

function App() {
    const [isMoreVisible, setIsMoreVisible] = useState<boolean>(false);
    const [bodyFetch, setBodyFetch] = useState<string>('[\n' +
        '    {\n' +
        '        "msg_type": "test_push_v2", // Шаблон уведомления, полученный ранее (от Димы)\n' +
        '        "ext_id": 1, // Значение по умолчанию – «1»\n' +
        '        "sender": "tst", // Сендер, полученный ранее (от Димы)\n' +
        '        "key": 123, // Ключ идемпотентности для уведомления - не обязательный параметр\n' +
        '        "user_shard_id": "1" // Шарда пользователя по AuthV3 - обязательный параметр, при выставлении неверной шары до пользователя может не дойти уведомление\n' +
        '        "user_id": "15629827", // Идентификатор конкретного пользователя в файле csv или таблице-источнике \n' +
        '        "params": { \n' +
        '            "link": "https://ya.ru",\n' +
        '            "msg_time": "2006-01-02T15:24:52",\n' +
        '            "site": "RU"\n' +
        '        } // Параметры шаблона, которые получаем ранее от редакции (от Димы).\n' +
        '    }\n' +
        ']\n');
    const [answer, setAnswer] = useState<IAnswer>({
        code: '200', status: "OK", response: '{ "id": "123", name: "Test"}'
    });
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);
    const [isLoadingAnswer, setIsLoadingAnswer] = useState<boolean>(false);
    const [isExample, setIsExample] = useState<boolean>(true);
    const onExecute = () => {
      setIsLoadingModal(true);
      setTimeout(()=>{
        setIsLoadingModal(false);
        setIsOpenModal(false);
        setIsLoadingAnswer(true);
        setTimeout(()=>{
            setIsExample(false);
            setAnswer({
                code: '200', status: "OK", response: '{ "id": "1", name: "Алёна Комарова"}'
            })
            setIsLoadingAnswer(false);
        }, 3000);
      },2000);
    }

    return (
        <>
            {isOpenModal && (
                <div className="backgroundModal">
                    <div className="modalContainer">
                        <p>Авторизация для выполнения запроса</p>
                        {isLoadingModal ? (
                            <div>Загрузка ...</div>
                        ) : (
                            <div style={{display: 'flex', flexDirection: "column", gap: "15px"}}>
                                <div className="inputContainer">
                                    <label htmlFor="login">Логин</label>
                                    <input id="login" type="text" value={"my-login@rrr.ru"}/>
                                </div>
                                <div className="inputContainer">
                                    <label htmlFor="password">Пароль</label>
                                    <input id="password" type="text" value={"********"}/>
                                </div>
                                <span>* это тестовый пример нажмите "Далее" или "Закрыть"</span>
                                <div className="buttonContainer">
                                    <button onClick={onExecute}>Далее</button>
                                    <button onClick={() => setIsOpenModal(false)}>Закрыть</button>
                                </div>
                            </div>)}
                    </div>
                </div>
            )}

            <div className="bodyFetch">
                <div className="titleFetch">
                    <div className="title"><p><span>POST</span> V2/MESSAGES/NEW</p></div>
                    <div className="buttonFetch">
                        <button
                            onClick={() => setIsMoreVisible(prev => !prev)}><img src={arrowLogo}
                                                                                 className={isMoreVisible ? "arrow transform" : "arrow"}
                                                                                 alt="React logo"/></button>
                    </div>
                </div>
                {isMoreVisible && (
                    <div className="moreContainer">
                        <p>Тело запроса</p>
                        <textarea onChange={(event)=> setBodyFetch(event.target.value)}>{bodyFetch}</textarea>
                        <button onClick={() => setIsOpenModal(true)}>Выполнить</button>
                        <div className="resultBlock">
                            <p>Результаты</p>
                            {isLoadingAnswer ?
                                (<div style={{width: '500px', padding: '10px'}}>Идёт выполнение запроса...</div>)
                                : (
                                    <table className='table'>
                                        <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Description</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{answer.code}</td>
                                            <td>
                                                <div className='descTable'>
                                                    <span>{answer.status}</span>
                                                    <span><b>{isExample ? 'Example value' : 'Value'}</b></span>
                                                    <span>{answer.response}</span>
                                                </div>

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>)}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default App
