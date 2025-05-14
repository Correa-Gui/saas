// src/pages/apostas/NovaAposta.jsx
import React, { useState } from 'react'
import PageTitle from 'components/PageTitle'
import {
  Row, Col,
  Card, CardBody,
  Form, FormGroup, Label, Input, Button
} from 'reactstrap'

export default function NovaAposta() {
  const [form, setForm] = useState({
    estrategia: '',
    campeonato: '',
    timeCasa: '',
    timeFora: '',
    tipo: 'simples',
    banca: '',
    valor: '',
    odd: '',
    resultado: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setForm(old => ({ ...old, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    // aqui você dispara seu serviço/API
    console.log('Salvar aposta:', form)
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Home', path: '/', active: false },
          { label: 'Apostas', path: '/apostas', active: false },
          { label: 'Nova Aposta', path: '/apostas/nova', active: true },
        ]}
        title="Nova Aposta"
      />

      <Row>
        <Col>
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                {/* Estratégia e Campeonato */}
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="estrategia">Estratégia Utilizada</Label>
                      <Input
                        type="text"
                        name="estrategia"
                        id="estrategia"
                        placeholder="Descreva a estratégia"
                        value={form.estrategia}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="campeonato">Campeonato</Label>
                      <Input
                        type="select"
                        name="campeonato"
                        id="campeonato"
                        value={form.campeonato}
                        onChange={handleChange}
                      >
                        <option value="">Selecione</option>
                        <option>Brasileirão</option>
                        <option>Premier League</option>
                        <option>La Liga</option>
                        {/* …outros… */}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                {/* Times e Tipo de Aposta */}
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Times</Label>
                      <div className="d-flex">
                        <Input
                          type="text"
                          name="timeCasa"
                          placeholder="Time da Casa"
                          value={form.timeCasa}
                          onChange={handleChange}
                          className="me-2"
                        />
                        <Input
                          type="text"
                          name="timeFora"
                          placeholder="Time de Fora"
                          value={form.timeFora}
                          onChange={handleChange}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup tag="fieldset">
                      <Label>Tipo de Aposta</Label>
                      <div>
                        <FormGroup check inline>
                          <Label check>
                            <Input
                              type="radio"
                              name="tipo"
                              value="simples"
                              checked={form.tipo === 'simples'}
                              onChange={handleChange}
                            />{' '}
                            Simples
                          </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Label check>
                            <Input
                              type="radio"
                              name="tipo"
                              value="multipla"
                              checked={form.tipo === 'multipla'}
                              onChange={handleChange}
                            />{' '}
                            Múltipla
                          </Label>
                        </FormGroup>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                {/* Banca, Valor e Odd */}
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="banca">Casa de Aposta</Label>
                      <Input
                        type="select"
                        name="banca"
                        id="banca"
                        value={form.banca}
                        onChange={handleChange}
                      >
                        <option value="">Selecione</option>
                        <option>Betano</option>
                        <option>Pinnacle</option>
                        <option>Bet365</option>
                        {/* …outras… */}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="valor">Valor da Aposta</Label>
                      <Input
                        type="number"
                        name="valor"
                        id="valor"
                        placeholder="R$"
                        value={form.valor}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="odd">Odd</Label>
                      <Input
                        type="number"
                        name="odd"
                        id="odd"
                        placeholder="ex: 1.85"
                        value={form.odd}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* Resultado */}
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="resultado">Resultado</Label>
                      <Input
                        type="select"
                        name="resultado"
                        id="resultado"
                        value={form.resultado}
                        onChange={handleChange}
                      >
                        <option value="">Selecione</option>
                        <option value="green">Green</option>
                        <option value="red">Red</option>
                        <option value="cashout">Cashout</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Button color="primary" type="submit">
                  Salvar Aposta
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}
